import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const UI_SRC = join(ROOT, 'packages/ui/src');
const COMPONENTS_DIR = join(UI_SRC, 'components');
const REGISTRY_DIR = join(ROOT, 'registry');
const CEM_PATH = join(ROOT, 'packages/ui/custom-elements.json');

interface CEMModule {
  kind: string;
  path: string;
  declarations?: Array<{
    kind: string;
    name: string;
    description?: string;
    tagName?: string;
    customElement?: boolean;
  }>;
}

interface ComponentMeta {
  name: string;
  description: string;
  tag: string;
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
}

interface RegistryFile {
  path: string;
  content: string;
}

interface ComponentEntry {
  name: string;
  tag: string;
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
  files: RegistryFile[];
}

function rewriteTokenImport(content: string): string {
  return content.replace(
    /from\s+['"]\.\.\/\.\.\/styles\/tokens['"]/g,
    `from '../styles/tokens'`,
  );
}

function getComponentMeta(): Map<string, { description: string; tag: string }> {
  const meta = new Map<string, { description: string; tag: string }>();

  if (!existsSync(CEM_PATH)) {
    console.warn('custom-elements.json not found, using fallback descriptions');
    return meta;
  }

  const cem = JSON.parse(readFileSync(CEM_PATH, 'utf-8'));
  for (const mod of cem.modules as CEMModule[]) {
    if (!mod.declarations) continue;
    for (const decl of mod.declarations) {
      if (decl.customElement && decl.tagName) {
        const name = decl.tagName.replace('bl-', '');
        meta.set(name, {
          description: decl.description?.split('\n')[0] ?? '',
          tag: decl.tagName,
        });
      }
    }
  }

  return meta;
}

function buildRegistry() {
  const componentDirs = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const meta = getComponentMeta();
  const indexComponents: ComponentMeta[] = [];
  const fallbackDescriptions: Record<string, string> = {
    button: 'A customisable button component with variant, size, and disabled support.',
    card: 'A card component that groups related content in a contained surface.',
    input: 'A text input component with label, help text, and validation support.',
    badge: 'A lightweight badge component for statuses, counts, or labels.',
    alert: 'A dismissible alert component for contextual feedback messages.',
  };

  for (const name of componentDirs) {
    const dir = join(COMPONENTS_DIR, name);
    const files: RegistryFile[] = [];
    const expectedFiles = [
      `${name}.ts`,
      `${name}.styles.ts`,
      'index.ts',
    ];

    for (const fileName of expectedFiles) {
      const filePath = join(dir, fileName);
      if (!existsSync(filePath)) {
        console.warn(`Skipping ${name}: missing ${fileName}`);
        continue;
      }
      let content = readFileSync(filePath, 'utf-8');
      content = rewriteTokenImport(content);
      files.push({
        path: `${name}/${fileName}`,
        content,
      });
    }

    if (files.length !== expectedFiles.length) continue;

    const compMeta = meta.get(name);
    const tag = compMeta?.tag ?? `bl-${name}`;
    const description =
      compMeta?.description ?? fallbackDescriptions[name] ?? '';

    const entry: ComponentEntry = {
      name,
      tag,
      registryDependencies: [],
      npmDependencies: { lit: '^3.2.0' },
      files,
    };

    writeFileSync(
      join(REGISTRY_DIR, 'components', `${name}.json`),
      JSON.stringify(entry, null, 2) + '\n',
    );

    indexComponents.push({
      name,
      description,
      tag,
      registryDependencies: [],
      npmDependencies: { lit: '^3.2.0' },
    });
  }

  // Build tokens registry entry
  const tokensPath = join(UI_SRC, 'styles/tokens.ts');
  const tokensContent = readFileSync(tokensPath, 'utf-8');
  writeFileSync(
    join(REGISTRY_DIR, 'styles', 'tokens.json'),
    JSON.stringify(
      {
        name: 'tokens',
        files: [{ path: 'styles/tokens.ts', content: tokensContent }],
      },
      null,
      2,
    ) + '\n',
  );

  // Build index
  const index = {
    version: '0.0.0',
    components: indexComponents,
  };
  writeFileSync(
    join(REGISTRY_DIR, 'index.json'),
    JSON.stringify(index, null, 2) + '\n',
  );

  console.log(`Registry built: ${indexComponents.length} components`);
  for (const c of indexComponents) {
    console.log(`  - ${c.name} (${c.tag})`);
  }
}

buildRegistry();
