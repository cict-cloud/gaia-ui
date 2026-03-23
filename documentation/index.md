# gaia-ui Documentation

Shared UI shell components for GAIA-based projects. Built on top of [Mantine](https://mantine.dev/) — bring your own Mantine install.

## Contents

- [Getting Started](./getting-started.md) — installation, peer dependencies, CSS import, and PostCSS setup
- [GaiaShellLayout](./components/GaiaShellLayout.md) — full app shell in one component
- [GaiaHeader](./components/GaiaHeader.md) — top header bar
- [GaiaNavbar](./components/GaiaNavbar.md) — left sidebar navigation
- [SubHeader](./components/SubHeader.md) — secondary bar above page content
- [NavbarLinksGroup](./components/NavbarLinksGroup.md) — individual nav link primitive
- [GaiaShellProvider](./context/GaiaShellProvider.md) — context provider for user and remote configs
- [GaiaShellContext](./context/GaiaShellContext.md) — context types and hooks (`useGaiaShellContext`, `useGaiaRemoteConfig`)
- [createRemoteBaseQuery](./api/createRemoteBaseQuery.md) — RTK Query base query with a mutable base URL
- [createRemoteConfigProvider](./api/createRemoteConfigProvider.md) — wires remote URL from context into an RTK Query API
- [API Reference](./api-reference.md) — all exported TypeScript types

## Quick overview

```
GaiaShellLayout          ← full app shell (wraps everything)
├── GaiaHeader           ← top header with logo, title, dropdown menus, right slot
├── GaiaNavbar           ← left sidebar with scrollable nav sections
│   └── NavbarLinksGroup ← individual nav link with optional collapsible children
└── AppShell.Main
    ├── SubHeader (optional) ← secondary bar with page title and action slot
    └── Container ← page content
```

`GaiaShellLayout` is the recommended entry point — it composes the header and navbar and manages the mobile burger toggle internally. Use `GaiaHeader` and `GaiaNavbar` directly only if you need to manage your own `AppShell`.

## Design tokens

The library uses Mantine's design token system with a black background (`bg="black"`) and a `convergeTeal` accent color. Active and hovered nav links use `--mantine-color-convergeTeal-light` and `--mantine-color-convergeTeal-light-color`.

Your Mantine theme must register `convergeTeal` as a custom color for the active states to render correctly.
