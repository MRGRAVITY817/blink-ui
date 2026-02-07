import { select, input, confirm } from '@inquirer/prompts';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import pc from 'picocolors';
import type { BlinkConfig, Framework } from '../types.js';
import { configExists, writeConfig } from '../utils/config.js';
import { fetchTokens } from '../utils/registry.js';
import { applyPrefix } from '../utils/transform.js';
import { ensureDir, writeFile, fileExists } from '../utils/fs.js';
import { logger } from '../utils/logger.js';

const DEFAULT_REGISTRY =
  'https://raw.githubusercontent.com/MRGRAVITY817/blink-ui/main/registry';

function detectPackageManager(): 'bun' | 'npm' | 'yarn' | 'pnpm' {
  const ua = process.env.npm_config_user_agent ?? '';
  if (ua.startsWith('bun')) return 'bun';
  if (ua.startsWith('yarn')) return 'yarn';
  if (ua.startsWith('pnpm')) return 'pnpm';

  // Fallback: check for lockfiles
  const cwd = process.cwd();
  if (fileExists(join(cwd, 'bun.lockb')) || fileExists(join(cwd, 'bun.lock'))) return 'bun';
  if (fileExists(join(cwd, 'yarn.lock'))) return 'yarn';
  if (fileExists(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  return 'npm';
}

function getInstallCommand(pm: string, deps: string[]): string {
  const d = deps.join(' ');
  switch (pm) {
    case 'bun':
      return `bun add ${d}`;
    case 'yarn':
      return `yarn add ${d}`;
    case 'pnpm':
      return `pnpm add ${d}`;
    default:
      return `npm install ${d}`;
  }
}

function getFrameworkHints(framework: Framework, prefix: string): string[] {
  const hints: string[] = [];
  switch (framework) {
    case 'react':
      hints.push(
        'Import components directly in your JSX/TSX files.',
        'Components register as custom elements automatically via @customElement.',
        'For React wrappers, you can use @lit/react createComponent().',
      );
      break;
    case 'vue':
      hints.push(
        'Add the custom element prefix to compilerOptions.isCustomElement in your Vue config:',
        `  isCustomElement: (tag) => tag.startsWith('${prefix}-')`,
        'Import component files in your entry or wherever needed.',
      );
      break;
    case 'svelte':
      hints.push(
        'Svelte supports custom elements natively. Just import the component files.',
        `Use standard HTML syntax: <${prefix}-button variant="primary">Click</${prefix}-button>`,
      );
      break;
    case 'solid':
      hints.push(
        'Import component files to register custom elements.',
        'Use standard HTML syntax in your JSX.',
      );
      break;
    default:
      hints.push(
        'Import component files to register the custom elements.',
        'Use them as standard HTML elements in your markup.',
      );
  }
  return hints;
}

export async function init() {
  logger.break();
  logger.log(pc.bold('Blink UI - Project Setup'));
  logger.break();

  if (configExists()) {
    const overwrite = await confirm({
      message: 'blink.config.json already exists. Overwrite?',
      default: false,
    });
    if (!overwrite) {
      logger.info('Aborted.');
      return;
    }
  }

  const framework = await select<Framework>({
    message: 'Which framework are you using?',
    choices: [
      { value: 'vanilla', name: 'Vanilla (no framework)' },
      { value: 'react', name: 'React' },
      { value: 'vue', name: 'Vue' },
      { value: 'svelte', name: 'Svelte' },
      { value: 'solid', name: 'Solid' },
    ],
  });

  const componentDir = await input({
    message: 'Component output directory:',
    default: 'src/components/ui',
  });

  const prefix = await input({
    message: 'Custom element prefix:',
    default: 'bl',
    validate: (val) =>
      /^[a-z][a-z0-9]*$/.test(val) || 'Prefix must be lowercase alphanumeric',
  });

  const config: BlinkConfig = {
    registry: DEFAULT_REGISTRY,
    framework,
    componentDir,
    prefix,
    installedComponents: [],
  };

  writeConfig(config);
  logger.success('Created blink.config.json');

  // Create styles directory and fetch tokens
  const stylesDir = join(process.cwd(), componentDir, 'styles');
  ensureDir(stylesDir);

  try {
    const tokens = await fetchTokens(config.registry);
    for (const file of tokens.files) {
      const content = applyPrefix(file.content, prefix);
      const fileName = file.path.split('/').pop()!;
      writeFile(join(stylesDir, fileName), content);
    }
    logger.success(`Created ${componentDir}/styles/tokens.ts`);
  } catch (err) {
    logger.warn(
      `Could not fetch tokens: ${err instanceof Error ? err.message : err}`,
    );
    logger.warn('You can manually add tokens later.');
  }

  // Install lit
  try {
    const pm = detectPackageManager();
    const cmd = getInstallCommand(pm, ['lit']);
    logger.info(`Installing lit via ${pm}...`);
    execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
    logger.success('Installed lit');
  } catch {
    logger.warn('Could not install lit automatically. Please install it manually: npm install lit');
  }

  // Framework hints
  logger.break();
  logger.log(pc.bold('Setup hints:'));
  const hints = getFrameworkHints(framework, prefix);
  for (const hint of hints) {
    logger.log(`  ${pc.dim(hint)}`);
  }

  logger.break();
  logger.success('Done! Run `blink add <component>` to add components.');
  logger.break();
}
