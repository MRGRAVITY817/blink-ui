import { join } from 'node:path';
import { createTwoFilesPatch } from 'diff';
import pc from 'picocolors';
import { readConfig } from '../utils/config.js';
import { fetchComponent } from '../utils/registry.js';
import { applyPrefix } from '../utils/transform.js';
import { fileExists, readFile } from '../utils/fs.js';
import { logger } from '../utils/logger.js';

export async function diff(componentName: string) {
  const config = readConfig();

  if (!config.installedComponents.includes(componentName)) {
    logger.error(
      `Component "${componentName}" is not installed. Run \`blink add ${componentName}\` first.`,
    );
    process.exit(1);
  }

  let component;
  try {
    component = await fetchComponent(componentName, config.registry);
  } catch (err) {
    logger.error(
      `Failed to fetch component: ${err instanceof Error ? err.message : err}`,
    );
    process.exit(1);
  }

  let hasDiff = false;

  for (const file of component.files) {
    const localPath = join(process.cwd(), config.componentDir, file.path);
    const registryContent = applyPrefix(file.content, config.prefix);

    if (!fileExists(localPath)) {
      logger.warn(`File missing locally: ${file.path}`);
      hasDiff = true;
      continue;
    }

    const localContent = readFile(localPath);

    if (localContent === registryContent) continue;

    hasDiff = true;
    const patch = createTwoFilesPatch(
      `registry/${file.path}`,
      `local/${file.path}`,
      registryContent,
      localContent,
      'registry',
      'local',
    );

    // Colorize the diff output
    for (const line of patch.split('\n')) {
      if (line.startsWith('+++') || line.startsWith('---')) {
        logger.log(pc.bold(line));
      } else if (line.startsWith('+')) {
        logger.log(pc.green(line));
      } else if (line.startsWith('-')) {
        logger.log(pc.red(line));
      } else if (line.startsWith('@@')) {
        logger.log(pc.cyan(line));
      } else {
        logger.log(line);
      }
    }
    logger.break();
  }

  if (!hasDiff) {
    logger.success(`${componentName}: up to date with registry.`);
  }
}
