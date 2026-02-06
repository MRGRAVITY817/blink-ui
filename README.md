# Blink UI

A web component design system built with [Lit](https://lit.dev/), packaged for use across any framework.

## Stack

- [Turborepo](https://turborepo.dev) — Monorepo build system
- [Lit](https://lit.dev/) — Web components library
- [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
- [Storybook](https://storybook.js.org/) — Component documentation (web-components-vite)
- [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) — Component metadata for tooling
- [TypeScript](https://www.typescriptlang.org/) — Static type checking
- [ESLint](https://eslint.org/) — Code linting
- [Prettier](https://prettier.io) — Code formatting
- [Changesets](https://github.com/changesets/changesets) — Versioning and changelogs
- [GitHub Actions](https://github.com/changesets/action) — Automated package publishing

## Apps & Packages

| Path | Description |
|---|---|
| `packages/ui` | Core component library (`@blink-ui/components`) — Lit web components |
| `packages/typescript-config` | Shared `tsconfig.json` presets |
| `packages/eslint-config` | Shared ESLint configurations |
| `apps/docs` | Storybook documentation site |
| `apps/example-react` | Vite + React example using `@lit/react` wrappers |
| `apps/example-vue` | Vite + Vue 3 example using native custom elements |
| `apps/example-svelte` | Vite + Svelte 5 example using native custom elements |
| `apps/example-solid` | Vite + Solid example using native custom elements |

## Components

All components use the `bl-` prefix and are styled with Shadow DOM + CSS custom properties (`--bl-*`).

| Component | Tag | Description |
|---|---|---|
| Button | `<bl-button>` | Button with variant, size, and disabled support |
| Card | `<bl-card>` | Container with header/body/footer slots |
| Input | `<bl-input>` | Text input with label, help text, and error states |
| Badge | `<bl-badge>` | Inline status badge with semantic color variants |
| Alert | `<bl-alert>` | Dismissible alert banner with variant support |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.3.4+

### Install

```sh
bun install
```

### Commands

```sh
bun run build    # Build all packages and apps
bun run dev      # Start all packages in dev/watch mode
bun run lint     # Lint all packages
bun run format   # Format all files with Prettier
bun run clean    # Remove node_modules and dist folders
```

### Run Storybook

```sh
bun run dev --filter=docs
```

Opens at [http://localhost:6006](http://localhost:6006).

### Run Example Apps

```sh
bun run dev --filter=example-react
bun run dev --filter=example-vue
bun run dev --filter=example-svelte
bun run dev --filter=example-solid
```

## Usage

### Install the package

```sh
npm install @blink-ui/components
```

### In a non-React framework (Vue, Svelte, Solid, vanilla JS)

Import the side-effect registration file, then use the elements directly in HTML:

```js
import '@blink-ui/components/define';
```

```html
<bl-button variant="primary" size="md">Click me</bl-button>
<bl-card variant="elevated">
  <div slot="header">Title</div>
  Card content goes here.
</bl-card>
<bl-input label="Email" placeholder="you@example.com"></bl-input>
<bl-badge variant="success">Active</bl-badge>
<bl-alert variant="info" closable>Heads up!</bl-alert>
```

### In React

Use the `@lit/react` wrappers for proper property and event handling:

```tsx
import { Button, Card, Input, Badge, Alert } from '@blink-ui/components/react';

function App() {
  return (
    <>
      <Button variant="primary" onClick={() => console.log('clicked')}>
        Click me
      </Button>
      <Input
        label="Email"
        onBlInput={(e) => console.log(e.detail.value)}
      />
      <Alert variant="warning" closable onBlDismiss={() => console.log('dismissed')}>
        Watch out!
      </Alert>
    </>
  );
}
```

### Individual component imports

Import only what you need for tree-shaking:

```js
import { BlButton } from '@blink-ui/components/button';
import { BlCard } from '@blink-ui/components/card';
```

## Theming

Components are styled via CSS custom properties. Override the `--bl-*` tokens to customize the design system:

```css
:root {
  --bl-color-primary-500: #8b5cf6;
  --bl-color-primary-600: #7c3aed;
  --bl-radius-md: 0.75rem;
  --bl-font-family-base: 'Inter', sans-serif;
}
```

See `packages/ui/src/styles/tokens.ts` for the full list of available tokens.

## Adding a New Component

1. Create a directory under `packages/ui/src/components/<name>/` with three files:
   - `<name>.styles.ts` — Styles using Lit's `css` tagged template
   - `<name>.ts` — Component class with `@customElement('bl-<name>')`
   - `index.ts` — Barrel re-export
2. Export the component from `packages/ui/src/index.ts`
3. Import the component file in `packages/ui/src/define.ts`
4. Add a React wrapper in `packages/ui/src/react/index.ts`
5. Add an entry to `packages/ui/tsup.config.ts`
6. Add an export path to `packages/ui/package.json`
7. Create a Storybook story in `apps/docs/stories/`

## Versioning & Publishing

This project uses [Changesets](https://github.com/changesets/changesets) to manage versions and publish to npm.

```sh
bun run changeset          # Generate a changeset
bun run version-packages   # Apply changesets and bump versions
bun run release            # Build and publish to npm
```

The GitHub Action in `.github/workflows/release.yml` automates this on push to `main`. You'll need `NPM_TOKEN` and `GITHUB_TOKEN` secrets configured in your repository settings.
