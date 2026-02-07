import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

export function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function writeFile(path: string, content: string): void {
  ensureDir(dirname(path));
  writeFileSync(path, content, 'utf-8');
}

export function readFile(path: string): string {
  return readFileSync(path, 'utf-8');
}

export function fileExists(path: string): boolean {
  return existsSync(path);
}
