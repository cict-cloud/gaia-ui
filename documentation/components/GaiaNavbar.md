# GaiaNavbar

The left sidebar navigation. Use it directly only if you manage your own `AppShell`; otherwise use [`GaiaShellLayout`](./GaiaShellLayout.md), which wires it up automatically.

## Import

```tsx
import { GaiaNavbar } from "@converge-cloudops/gaia-ui";
import type { GaiaNavbarProps, GaiaNavbarSection, GaiaNavbarLink } from "@converge-cloudops/gaia-ui";
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `sections` | `GaiaNavbarSection[]` | All available nav sections. The correct one is resolved automatically from the current pathname. |
| `resolveSection` | `(pathname: string) => string` | Called with the current pathname. Return the `title` of the section to display, or any non-matching string to show nothing. |

`GaiaNavbar` reads the current pathname internally via `useLocation()` — you do not pass `currentPath` or the active section directly. **`react-router` is required.**

### `GaiaNavbarSection`

```ts
interface GaiaNavbarSection {
  title: string;          // Section heading shown at the top of the navbar
  links: GaiaNavbarLink[];
}
```

### `GaiaNavbarLink`

```ts
interface GaiaNavbarLink {
  icon: Icon;                // A Tabler icon component (e.g. IconServer)
  label: string;
  link?: string;             // Route path — used for simple (non-collapsible) links
  initiallyOpened?: boolean; // Whether the collapsible group starts open
  links?: { label: string; link: string }[]; // Child links — makes this a collapsible group
}
```

A `GaiaNavbarLink` is either a **simple link** (`link` provided, no `links` array) or a **collapsible group** (`links` array provided).

## Layout

```
┌─────────────────────┐
│  Section Title      │  ← resolved from current route
├─────────────────────┤
│  [icon] Link 1      │  ← simple link
│  [icon] Link 2  ›   │  ← collapsible group (chevron)
│    └ Child 1        │
│    └ Child 2        │
│  [icon] Link 3      │
└─────────────────────┘
```

Background is `black`, text is `white`. The link list is wrapped in Mantine's `<ScrollArea>`.

## Basic usage

```tsx
import { AppShell } from "@mantine/core";
import { GaiaNavbar, GaiaNavbarSection } from "@converge-cloudops/gaia-ui";
import { IconServer, IconNetwork, IconLayoutDashboard } from "@tabler/icons-react";

const sections: GaiaNavbarSection[] = [
  {
    title: "Dashboard",
    links: [
      { icon: IconLayoutDashboard, label: "Overview", link: "/dashboard" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { icon: IconServer, label: "Nodes", link: "/infrastructure/nodes" },
      { icon: IconNetwork, label: "Networks", link: "/infrastructure/networks" },
    ],
  },
];

function resolveSection(pathname: string): string {
  if (pathname.startsWith("/infrastructure")) return "Infrastructure";
  return "Dashboard";
}

export function MyShell({ children }) {
  return (
    <AppShell navbar={{ width: 240, breakpoint: "sm" }}>
      <AppShell.Navbar>
        <GaiaNavbar sections={sections} resolveSection={resolveSection} />
      </AppShell.Navbar>
      {/* ... */}
    </AppShell>
  );
}
```

## resolveSection patterns

`resolveSection` receives the current pathname and must return the exact `title` string of the section to display. If the returned string doesn't match any section title, the navbar renders nothing.

```tsx
// Prefix-based
resolveSection={(pathname) => {
  if (pathname.startsWith("/infrastructure")) return "Infrastructure";
  if (pathname.startsWith("/platform")) return "Platform";
  return "Dashboard";
}}

// Exact match
resolveSection={(pathname) => {
  const map: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/infrastructure": "Infrastructure",
  };
  return map[pathname] ?? "";
}}

// Always show one section
resolveSection={() => "Dashboard"}
```

## Collapsible link groups

Provide a `links` array on a `GaiaNavbarLink` to make it a collapsible group.

```tsx
const sections: GaiaNavbarSection[] = [
  {
    title: "Infrastructure",
    links: [
      {
        icon: IconServer,
        label: "Nodes",
        initiallyOpened: true,
        links: [
          { label: "Physical", link: "/infrastructure/nodes/physical" },
          { label: "Virtual",  link: "/infrastructure/nodes/virtual" },
        ],
      },
      {
        icon: IconNetwork,
        label: "Networks",
        links: [
          { label: "VPC",     link: "/infrastructure/networks/vpc" },
          { label: "Subnets", link: "/infrastructure/networks/subnets" },
        ],
      },
    ],
  },
];
```

## Hiding the navbar

Return a string that doesn't match any section title from `resolveSection` to render nothing:

```tsx
resolveSection={(pathname) => {
  if (pathname === "/login") return "";   // no navbar on login page
  return "Dashboard";
}}
```
