# gaia-ui

Shared UI shell components for GAIA-based projects. Built on top of [Mantine](https://mantine.dev/) — bring your own Mantine install.

## Installation

```bash
npm install @converge-cloudops/gaia-ui
```

### Peer dependencies

```bash
npm install react@19.2.4 react-dom@19.2.4 @mantine/core@8.3.14 @mantine/hooks@8.3.14 @tabler/icons-react@3.36.0
# required for navigation links (GaiaNavbar uses useLocation internally):
npm install react-router@7.9.1
```

### Import the stylesheet

```tsx
import "@converge-cloudops/gaia-ui/styles.css";
```

---

## Quick example

```tsx
import "@mantine/core/styles.css";
import "@converge-cloudops/gaia-ui/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { GaiaShellLayout } from "@converge-cloudops/gaia-ui";
import { IconLayoutDashboard, IconChartBar } from "@tabler/icons-react";

const theme = createTheme({
  colors: {
    convergeTeal: [
      "#e6fafa",
      "#d0f2f2",
      "#a1e4e4",
      "#6ed6d6",
      "#3ecaca",
      "#20bfbf",
      "#0db8b8",
      "#00a0a0",
      "#008f8f",
      "#007b7b",
    ],
  },
  primaryColor: "convergeTeal",
});

const sections = [
  {
    title: "Dashboard",
    links: [
      { icon: IconLayoutDashboard, label: "Overview", link: "/dashboard" },
      { icon: IconChartBar, label: "Analytics", link: "/dashboard/analytics" },
    ],
  },
];

function AppLayout() {
  return (
    <GaiaShellLayout
      headerProps={{
        title: "GAIA",
        menuGroups: [
          {
            label: "Tropos",
            items: [{ label: "Overview", path: "/tropos" }],
          },
        ],
      }}
      navbarProps={{
        sections,
        resolveSection: () => "Dashboard",
      }}
    >
      <Outlet />
    </GaiaShellLayout>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{ path: "/dashboard", element: <div>Overview</div> }],
  },
]);

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
```

> The `convergeTeal` custom color is required — active and hovered nav links use this token.

---

## Documentation

Full documentation is in the [`documentation/`](./documentation/) folder:

- [Getting Started](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/getting-started.md) — peer deps, CSS import, PostCSS setup, `convergeTeal` theme config
- [GaiaShellLayout](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/components/GaiaShellLayout.md) — full shell in one component
- [GaiaHeader](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/components/GaiaHeader.md) — top header bar
- [GaiaNavbar](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/components/GaiaNavbar.md) — left sidebar navigation
- [NavbarLinksGroup](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/components/NavbarLinksGroup.md) — nav link primitive
- [GaiaShellProvider](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/context/GaiaShellProvider.md) — context provider for user and remote configs
- [GaiaShellContext](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/context/GaiaShellContext.md) — context types and hooks (`useGaiaShellContext`, `useGaiaRemoteConfig`)
- [createRemoteBaseQuery](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/api/createRemoteBaseQuery.md) — RTK Query base query with a mutable base URL
- [createRemoteConfigProvider](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/api/createRemoteConfigProvider.md) — wires remote URL from context into an RTK Query API
- [API Reference](https://github.com/cict-cloud/gaia-ui/blob/main/documentation/api-reference.md) — all exported TypeScript types

---

## Development

```bash
npm run build        # one-off build
npm run build:watch  # rebuild on change
npm run typecheck    # type check without emitting
```

## Publishing

```bash
npm run prepublishOnly  # cleans and rebuilds
npm publish
```
