# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@converge-cloudops/gaia-ui` is a shared React UI shell component library for GAIA-based cloud operations projects. It provides pre-styled layout components (header, navbar, app shell) built on Mantine v8 with a black theme and "convergeTeal" accent.

## Commands

```bash
# Build the library
npm run build

# Watch mode during development
npm run build:watch

# Type checking (no emit)
npm run typecheck

# Clean dist output
npm run clean

# Build for publishing (clean + build)
npm run prepublishOnly
```

There is no test runner configured in this project.

## Architecture

This is a **Vite library mode** project that outputs dual-format bundles (ESM + CJS) with TypeScript declarations. The entry point is `src/index.ts`, which re-exports all public components and their types.

### Component hierarchy

```
GaiaShellLayout          ← full app shell (wraps everything)
├── GaiaHeader           ← top header with logo, title, dropdown menus, right slot
└── GaiaNavbar           ← left sidebar with scrollable nav sections
    └── NavbarLinksGroup ← individual nav link with optional collapsible children
```

`GaiaShellLayout` composes `GaiaHeader` and `GaiaNavbar` together and manages the mobile burger toggle and responsive breakpoints. Consumers can also use `GaiaHeader` and `GaiaNavbar` independently for custom shell layouts.

### Styling

- Uses **PostCSS** with `postcss-preset-mantine` and `postcss-simple-vars`
- Custom Mantine breakpoints are defined in `postcss.config.cjs`
- CSS is bundled into a single `gaia-ui.css` file (consumers must import it)
- CSS Modules (`.module.css`) are supported via `declarations.d.ts`

### Build output

Vite is configured in library mode (`vite.config.ts`):
- Formats: `es` and `cjs`
- External: `react`, `react-dom`, `react/jsx-runtime`, all `@mantine/*`, `@tabler/icons-react`, `react-router`
- Types generated via `vite-plugin-dts`

### Peer dependencies

Consuming projects must provide: `react >=18`, `react-dom >=18`, `@mantine/core >=8`, `@mantine/hooks >=8`, `@tabler/icons-react >=3`. React Router (`react-router >=6`) is optional and only needed if using active-link highlighting in `NavbarLinksGroup`.

### Active path detection

`NavbarLinksGroup` uses `react-router`'s `useLocation` to highlight the active link. The `GaiaNavbar` passes `currentPath` down to support this without requiring React Router in non-router contexts.
