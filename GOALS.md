# Blink UI — Project Goals

## Mission

An accessibility-first, web-component-native design system framework that ships as downloadable source code, enabling teams to build fully custom design systems from battle-tested primitives.

## Core Pillars

### 1. Code Ownership (shadcn model)

- CLI tool (`blink add bl-button`) that copies component source into the user's project — not a dependency
- Users own and modify the code freely
- Version tracking so users can diff upstream changes and selectively merge updates
- Template scaffolding: `blink init` sets up the tokens, base styles, and project structure

### 2. Token-Driven Theming

- A comprehensive design token layer (colors, typography, spacing, elevation, motion, breakpoints) that controls the entire system
- Ship multiple starter themes (neutral, branded, high-contrast) as token presets
- A single `tokens.css` or `tokens.ts` file is the only thing users need to edit for a complete visual rebrand
- Semantic token aliases (e.g., `--bl-color-surface`, `--bl-color-on-surface`) on top of the primitive scale, following the pattern systems like Material Design 3 use

### 3. Accessibility First

- Every primitive implements the relevant [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) pattern
- Full keyboard navigation, focus management, and screen reader support at the primitive layer
- Roving tabindex, focus trapping, live regions, and announcement utilities built in
- Automated a11y testing in CI (axe-core or similar)
- This is the hard differentiator — most web component libraries treat a11y as an afterthought

### 4. Two-Layer Architecture

Rather than rigid atom/molecule/organism tiers (which become arbitrary and hard to maintain as a project grows), Blink UI uses a simple two-layer model:

| Layer | Examples | Description |
|---|---|---|
| **Primitives** | Button, Checkbox, Popover, Tabs, Dialog, Focus trap, Portal, Visually-hidden | Reusable building blocks with a11y and behavior baked in. These are the foundation — each solves one interaction or UI pattern. |
| **Components** | Date Picker, Combobox, Command Palette, Data Table, Auth card, Form layout | Opinionated compositions of primitives that solve specific, higher-level UI problems. Users are expected to customize these. |

The distinction is straightforward: primitives are reusable behaviors/elements, components are assembled from those to solve a specific problem. No need to debate which sub-tier something belongs to.

### 5. Web Components Forever

- Shadow DOM encapsulation for style isolation
- Framework-agnostic by default — works in any HTML context
- First-class wrappers for React (`@lit/react`), Vue, Svelte, Solid, Angular
- Custom Elements Manifest for IDE/tooling integration
- SSR-compatible via Lit's SSR support (`@lit-labs/ssr`)

## Milestone Roadmap

### v0.1 — Foundation (current state)

- 5 starter components, token system, Storybook, framework examples

### v0.2 — CLI & Code Download

- `blink` CLI tool: `init`, `add`, `list`, `diff`
- Component registry (local JSON manifest or remote)
- Project scaffolding with token presets

### v0.3 — Primitives Expansion

- Behavior primitives: focus-trap, portal, visually-hidden, live-announce, click-outside
- UI primitives: Avatar, Icon, Spinner, Separator, Toggle, Checkbox, Radio, Switch, Label
- Implement WAI-ARIA patterns across all primitives
- Integrate axe-core into Storybook and CI

### v0.4 — Interaction Primitives

- Tooltip, Popover, Select, Tabs, Toggle Group, Accordion, Toast
- Dialog/Modal, Dropdown Menu, Context Menu
- Full keyboard navigation and focus management

### v0.5 — Components

- Combobox, Command Palette, Date Picker, Data Table
- Form layout, Page header, Sidebar nav
- All composed from primitives

### v0.7 — Theming & Documentation

- Multiple starter themes
- Theme editor / token playground
- Full documentation site (beyond Storybook)
- Migration guides for common UI libraries

## What Sets This Apart

Most web component libraries (Shoelace/Web Awesome, Lion, Spectrum) ship as npm packages you consume as-is. Blink UI combines:

- **shadcn's ownership model** — you own the code
- **Radix/AriaKit's accessibility rigor** — primitives done right
- **Lit's web standards foundation** — no framework lock-in
- **UntitledUI's token-driven customization** — rebrand by editing one file

That combination doesn't exist today in the web component space. The closest is shadcn (React-only) or Shoelace (dependency, not downloadable source).
