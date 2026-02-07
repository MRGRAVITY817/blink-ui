import { join } from 'node:path';
import pc from 'picocolors';
import { readConfig, writeConfig } from '../utils/config.js';
import { fetchIndex, fetchComponent } from '../utils/registry.js';
import { applyPrefix } from '../utils/transform.js';
import { writeFile, fileExists } from '../utils/fs.js';
import { logger } from '../utils/logger.js';
import type { RegistryComponent } from '../types.js';

interface AddOptions {
  all?: boolean;
  overwrite?: boolean;
}

async function resolveComponents(
  names: string[],
  registryUrl: string,
  resolved: Map<string, RegistryComponent>,
): Promise<void> {
  for (const name of names) {
    if (resolved.has(name)) continue;

    let component: RegistryComponent;
    try {
      component = await fetchComponent(name, registryUrl);
    } catch (err) {
      logger.error(
        `Component "${name}" not found: ${err instanceof Error ? err.message : err}`,
      );
      process.exit(1);
    }

    resolved.set(name, component);

    if (component.registryDependencies.length > 0) {
      await resolveComponents(
        component.registryDependencies,
        registryUrl,
        resolved,
      );
    }
  }
}

export async function add(components: string[], options: AddOptions) {
  const config = readConfig();
  let names = components;

  if (options.all) {
    let index;
    try {
      index = await fetchIndex(config.registry);
    } catch (err) {
      logger.error(
        `Failed to fetch registry: ${err instanceof Error ? err.message : err}`,
      );
      process.exit(1);
    }
    names = index.components.map((c) => c.name);
  }

  if (names.length === 0) {
    logger.error('No components specified. Use `blink add <name>` or `blink add --all`.');
    process.exit(1);
  }

  // Resolve all components (including transitive registry dependencies)
  const resolved = new Map<string, RegistryComponent>();
  await resolveComponents(names, config.registry, resolved);

  const installed: string[] = [];
  const skipped: string[] = [];

  for (const [name, component] of resolved) {
    const compDir = join(process.cwd(), config.componentDir, name);

    // Check if already installed
    if (!options.overwrite && config.installedComponents.includes(name)) {
      const firstFile = component.files[0];
      if (firstFile && fileExists(join(process.cwd(), config.componentDir, firstFile.path))) {
        skipped.push(name);
        continue;
      }
    }

    // Write component files
    for (const file of component.files) {
      const content = applyPrefix(file.content, config.prefix);
      const filePath = join(process.cwd(), config.componentDir, file.path);
      writeFile(filePath, content);
    }

    installed.push(name);

    // Track in config
    if (!config.installedComponents.includes(name)) {
      config.installedComponents.push(name);
    }
  }

  // Save updated config
  config.installedComponents.sort();
  writeConfig(config);

  // Print summary
  logger.break();
  if (installed.length > 0) {
    logger.success(
      `Added ${installed.length} component${installed.length > 1 ? 's' : ''}:`,
    );
    for (const name of installed) {
      logger.log(`  ${pc.green('+')} ${name}`);
    }
  }
  if (skipped.length > 0) {
    logger.warn(
      `Skipped ${skipped.length} (already installed, use --overwrite):`,
    );
    for (const name of skipped) {
      logger.log(`  ${pc.dim('-')} ${name}`);
    }
  }
  logger.break();
}
