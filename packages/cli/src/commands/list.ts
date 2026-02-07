import pc from 'picocolors';
import { configExists, readConfig } from '../utils/config.js';
import { fetchIndex } from '../utils/registry.js';
import { logger } from '../utils/logger.js';

export async function list() {
  const config = configExists() ? readConfig() : null;
  const registryUrl = config?.registry;
  const installed = new Set(config?.installedComponents ?? []);

  let index;
  try {
    index = await fetchIndex(registryUrl);
  } catch (err) {
    logger.error(
      `Failed to fetch registry: ${err instanceof Error ? err.message : err}`,
    );
    process.exit(1);
  }

  if (index.components.length === 0) {
    logger.info('No components available in the registry.');
    return;
  }

  logger.break();
  logger.log(pc.bold('Available components:'));
  logger.break();

  const nameWidth = 12;
  const tagWidth = 16;
  const statusWidth = 12;
  logger.log(
    `  ${pc.dim('Name'.padEnd(nameWidth))}${pc.dim('Tag'.padEnd(tagWidth))}${pc.dim('Status'.padEnd(statusWidth))}${pc.dim('Description')}`,
  );
  logger.log(pc.dim(`  ${'─'.repeat(nameWidth + tagWidth + statusWidth + 30)}`));

  for (const comp of index.components) {
    const isInstalled = installed.has(comp.name);
    const namePadded = comp.name.padEnd(nameWidth);
    const tagPadded = comp.tag.padEnd(tagWidth);
    const statusText = isInstalled ? 'installed' : 'available';
    const statusPadded = statusText.padEnd(statusWidth);

    const name = isInstalled ? pc.green(namePadded) : namePadded;
    const status = isInstalled ? pc.green(statusPadded) : pc.dim(statusPadded);

    logger.log(`  ${name}${tagPadded}${status}${pc.dim(comp.description)}`);
  }

  logger.break();
  logger.log(
    pc.dim(`  ${index.components.length} components available, ${installed.size} installed`),
  );
  logger.break();
}
