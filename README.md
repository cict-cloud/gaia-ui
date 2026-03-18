# gaia-ui

Shared UI shell components for GAIA-based projects. Built on top of Mantine — bring your own Mantine install.

## Installation

```bash
npm install @converge-cloudops/gaia-ui
```

### Peer dependencies

`gaia-ui` does **not** bundle Mantine or React. Your project must have these installed with the proper versions:

```bash
npm install @mantine/core @mantine/hooks @tabler/icons-react react react-dom
```

If you use `GaiaNavbar` or `GaiaShellLayout`, you'll also need:

```bash
npm install react-router
```

---

## Components

### `GaiaShellLayout` — full shell in one import

The easiest way to use the shell. Handles `AppShell`, the mobile burger, and disclosure state internally.

```tsx
import { GaiaShellLayout, GaiaNavbarSection } from "gaia-ui";
import { Link, useLocation } from "react-router";

const NAV: GaiaNavbarSection = {
  title: "Dashboard",
  links: [
    { label: "Overview", path: "/dashboard" },
    { label: "Analytics", path: "/dashboard/analytics" },
  ],
};

export function AppLayout({ children }) {
  const { pathname } = useLocation();

  return (
    <GaiaShellLayout
      headerProps={{
        title: "GAIA",
        logoSrc: "/Cloud.png",
        menuGroups: [
          {
            label: "Tropos",
            items: [{ label: "Overview", onClick: () => {} }],
          },
        ],
      }}
      navbarProps={{
        section: NAV,
        currentPath: pathname,
        renderLink: (link, isActive) => (
          <Link
            key={link.path}
            to={link.path}
            style={{ fontWeight: isActive ? "bold" : "normal" }}
          >
            {link.label}
          </Link>
        ),
      }}
    >
      {children}
    </GaiaShellLayout>
  );
}
```

---

### `GaiaHeader`

Use standalone if you manage `AppShell` yourself.

```tsx
import { GaiaHeader } from "gaia-ui";

<GaiaHeader
  title="GAIA"
  logoSrc="/Cloud.png"
  menuGroups={[
    { label: "Menu", items: [{ label: "Tropos", onClick: () => {} }] },
  ]}
  burgerSlot={
    <Burger opened={opened} onClick={toggle} color="white" size="sm" />
  }
  rightSection={<Avatar />}
/>;
```

---

### `GaiaNavbar`

Use standalone if you manage `AppShell` yourself.

```tsx
import { GaiaNavbar } from "gaia-ui";
import { Link, useLocation } from "react-router";

const section = {
  title: "Infrastructure",
  links: [
    { label: "Nodes", path: "/infrastructure/nodes" },
    { label: "Networks", path: "/infrastructure/networks" },
  ],
};

const { pathname } = useLocation();

<GaiaNavbar
  section={section}
  currentPath={pathname}
  renderLink={(link, isActive) => (
    <Link key={link.path} to={link.path}>
      {link.label}
    </Link>
  )}
/>;
```

---

## Development

```bash
npm install
npm run build        # one-off build
npm run build:watch  # rebuild on change
npm run typecheck    # type check without emitting
```

## Publishing

```bash
npm run prepublishOnly  # cleans and rebuilds
npm publish
```
