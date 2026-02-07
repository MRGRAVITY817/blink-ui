import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const UI_SRC = join(ROOT, 'packages/ui/src');
const COMPONENTS_DIR = join(UI_SRC, 'components');
const PRIMITIVES_DIR = join(UI_SRC, 'primitives');
const CONTROLLERS_DIR = join(UI_SRC, 'controllers');
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

function rewriteControllerImport(content: string): string {
  return content.replace(
    /from\s+['"]\.\.\/\.\.\/controllers\/([^'"]+)['"]/g,
    `from '../controllers/$1'`,
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

const REGISTRY_DEPS: Record<string, string[]> = {
  checkbox: ['label'],
  radio: ['label'],
  'radio-group': ['radio'],
  spinner: ['visually-hidden'],
  'toggle-group': ['toggle'],
  tabs: [],
  select: [],
  menu: [],
  'context-menu': ['menu'],
  tooltip: [],
  popover: [],
  accordion: [],
  dialog: [],
  toast: ['live-announce'],
  // v0.5 Components
  'form-layout': ['label', 'input'],
  'page-header': [],
  sidebar: ['dialog'],
  combobox: [],
  command: ['dialog'],
  'data-table': ['checkbox'],
  'date-picker': [],
};

const NPM_DEPS: Record<string, Record<string, string>> = {
  tooltip: { lit: '^3.2.0', '@floating-ui/dom': '^1.7.0' },
  popover: { lit: '^3.2.0', '@floating-ui/dom': '^1.7.0' },
  select: { lit: '^3.2.0', '@floating-ui/dom': '^1.7.0' },
  menu: { lit: '^3.2.0', '@floating-ui/dom': '^1.7.0' },
  'context-menu': { lit: '^3.2.0', '@floating-ui/dom': '^1.7.0' },
  // v0.5 Components
  combobox: { lit: '^3.2.0', '@floating-ui/dom': '^1.7.0' },
  'date-picker': { lit: '^3.2.0', '@floating-ui/dom': '^1.7.0' },
};

function buildRegistry() {
  // Ensure output dirs exist
  for (const dir of ['components', 'primitives', 'controllers', 'styles']) {
    const target = join(REGISTRY_DIR, dir);
    if (!existsSync(target)) mkdirSync(target, { recursive: true });
  }

  const meta = getComponentMeta();
  const indexComponents: ComponentMeta[] = [];

  const fallbackDescriptions: Record<string, string> = {
    button: 'A customisable button component with variant, size, and disabled support.',
    card: 'A card component that groups related content in a contained surface.',
    input: 'A text input component with label, help text, and validation support.',
    badge: 'A lightweight badge component for statuses, counts, or labels.',
    alert: 'A dismissible alert component for contextual feedback messages.',
    separator: 'A horizontal or vertical content divider.',
    label: 'A form label that associates with form controls.',
    avatar: 'An avatar component with image and initials fallback.',
    spinner: 'A loading spinner with screen reader announcement.',
    skeleton: 'A placeholder loading state with animated pulse.',
    icon: 'An SVG icon wrapper with decorative and labelled modes.',
    toggle: 'A pressable toggle button with aria-pressed.',
    checkbox: 'A checkbox with indeterminate (mixed) state support.',
    switch: 'An on/off toggle switch component.',
    radio: 'An individual radio button for use inside radio-group.',
    'radio-group': 'A radio group with arrow key navigation and single selection.',
    // v0.4 Interaction Primitives
    tooltip: 'A tooltip that displays on hover/focus of a trigger element.',
    popover: 'A popover anchored to a trigger with configurable placement.',
    accordion: 'An accordion with expandable/collapsible items.',
    'toggle-group': 'Groups toggle buttons into single or multiple selection.',
    tabs: 'A tabbed interface with keyboard navigation.',
    select: 'A select dropdown with virtual focus and type-to-search.',
    menu: 'A dropdown menu with keyboard navigation.',
    'context-menu': 'A context menu triggered by right-click.',
    dialog: 'A modal dialog with focus trap and backdrop.',
    toast: 'Toast notifications with imperative API and auto-dismiss.',
    // v0.5 Components
    'form-layout': 'Form layout components for structuring form fields, labels, and validation.',
    'page-header': 'Page header with breadcrumb, title, description, and action slots.',
    sidebar: 'Responsive sidebar navigation with collapse/expand and drawer modes.',
    combobox: 'An autocomplete combobox with input, filtering, and dropdown listbox.',
    command: 'Command palette with search, keyboard navigation, and modal/inline modes.',
    'data-table': 'Data table with sorting, selection, pagination, and grid navigation.',
    'date-picker': 'Date picker with segmented input and calendar popup.',
    // Primitives
    'visually-hidden': 'Visually hidden but accessible to screen readers.',
    portal: 'Renders children outside the parent DOM hierarchy.',
    'live-announce': 'Programmatic screen reader announcements via aria-live.',
  };

  // --- Process components ---
  const componentDirs = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const name of componentDirs) {
    const dir = join(COMPONENTS_DIR, name);
    const files: RegistryFile[] = [];

    // Collect all .ts files in the component directory (supports compound components)
    const allTsFiles = readdirSync(dir).filter((f) => f.endsWith('.ts')).sort();

    // Must have at least an index.ts
    if (!allTsFiles.includes('index.ts')) {
      console.warn(`Skipping ${name}: missing index.ts`);
      continue;
    }

    for (const fileName of allTsFiles) {
      const filePath = join(dir, fileName);
      let content = readFileSync(filePath, 'utf-8');
      content = rewriteTokenImport(content);
      content = rewriteControllerImport(content);
      files.push({
        path: `${name}/${fileName}`,
        content,
      });
    }

    if (files.length === 0) continue;

    const compMeta = meta.get(name);
    const tag = compMeta?.tag ?? `bl-${name}`;
    const description =
      compMeta?.description ?? fallbackDescriptions[name] ?? '';

    const npmDeps = NPM_DEPS[name] ?? { lit: '^3.2.0' };

    const entry: ComponentEntry = {
      name,
      tag,
      registryDependencies: REGISTRY_DEPS[name] ?? [],
      npmDependencies: npmDeps,
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
      registryDependencies: REGISTRY_DEPS[name] ?? [],
      npmDependencies: npmDeps,
    });
  }

  // --- Process primitives ---
  if (existsSync(PRIMITIVES_DIR)) {
    const primitiveDirs = readdirSync(PRIMITIVES_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();

    for (const name of primitiveDirs) {
      const dir = join(PRIMITIVES_DIR, name);
      const allFiles = readdirSync(dir).filter((f) => f.endsWith('.ts'));
      const files: RegistryFile[] = [];

      for (const fileName of allFiles) {
        const filePath = join(dir, fileName);
        let content = readFileSync(filePath, 'utf-8');
        content = rewriteTokenImport(content);
        files.push({
          path: `${name}/${fileName}`,
          content,
        });
      }

      if (files.length === 0) continue;

      const tag = name === 'live-announce' ? '' : `bl-${name}`;
      const description = fallbackDescriptions[name] ?? '';

      const entry = {
        name,
        tag,
        registryDependencies: [] as string[],
        npmDependencies: tag ? { lit: '^3.2.0' } : {},
        files,
      };

      writeFileSync(
        join(REGISTRY_DIR, 'primitives', `${name}.json`),
        JSON.stringify(entry, null, 2) + '\n',
      );

      indexComponents.push({
        name,
        description,
        tag,
        registryDependencies: [],
        npmDependencies: tag ? { lit: '^3.2.0' } : {},
      });
    }
  }

  // --- Process controllers ---
  if (existsSync(CONTROLLERS_DIR)) {
    const controllerFiles = readdirSync(CONTROLLERS_DIR).filter(
      (f) => f.endsWith('.ts') && f !== 'index.ts',
    );

    const files: RegistryFile[] = [];
    for (const fileName of controllerFiles) {
      const filePath = join(CONTROLLERS_DIR, fileName);
      const content = readFileSync(filePath, 'utf-8');
      files.push({
        path: `controllers/${fileName}`,
        content,
      });
    }

    // Include barrel
    const indexPath = join(CONTROLLERS_DIR, 'index.ts');
    if (existsSync(indexPath)) {
      files.push({
        path: 'controllers/index.ts',
        content: readFileSync(indexPath, 'utf-8'),
      });
    }

    if (files.length > 0) {
      writeFileSync(
        join(REGISTRY_DIR, 'controllers', 'controllers.json'),
        JSON.stringify(
          {
            name: 'controllers',
            files,
          },
          null,
          2,
        ) + '\n',
      );
    }
  }

  // --- Build tokens registry entry ---
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

  // --- Build index ---
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
    console.log(`  - ${c.name}${c.tag ? ` (${c.tag})` : ''}`);
  }
}

buildRegistry();
