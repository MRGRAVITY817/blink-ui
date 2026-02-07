import { join } from 'node:path';
import type { BlinkConfig } from '../types.js';
import { fileExists, readFile, writeFile } from './fs.js';

const CONFIG_FILE = 'blink.config.json';

export function getConfigPath(): string {
  return join(process.cwd(), CONFIG_FILE);
}

export function configExists(): boolean {
  return fileExists(getConfigPath());
}

export function readConfig(): BlinkConfig {
  const path = getConfigPath();
  if (!fileExists(path)) {
    throw new Error(
      'blink.config.json not found. Run `blink init` first.',
    );
  }
  return JSON.parse(readFile(path)) as BlinkConfig;
}

export function writeConfig(config: BlinkConfig): void {
  writeFile(getConfigPath(), JSON.stringify(config, null, 2) + '\n');
}
