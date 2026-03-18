# NavbarLinksGroup

The nav link primitive used internally by `GaiaNavbar`. Export it directly if you need to build a custom nav layout that matches the same visual style.

## Import

```tsx
import { NavbarLinksGroup } from "@converge-cloudops/gaia-ui";
import type { NavbarLinksGroupProps, NavbarLinksGroupItem } from "@converge-cloudops/gaia-ui";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `Icon` | — | A Tabler icon component passed as a value (not JSX). |
| `label` | `string` | — | Display label for the link or group. |
| `link` | `string` | — | Route path. Used when there are no child `links`. |
| `initiallyOpened` | `boolean` | `false` | Whether a collapsible group starts expanded. |
| `links` | `NavbarLinksGroupItem[]` | — | Child links. Presence of this array switches to collapsible-group mode. |
| `currentPath` | `string` | — | Current pathname used to apply the active style. |

### `NavbarLinksGroupItem`

```ts
interface NavbarLinksGroupItem {
  label: string;
  link: string;
}
```

## Two modes

### Simple link

When `link` is provided and `links` is absent (or empty), renders a single `<Link>` with an icon:

```tsx
<NavbarLinksGroup
  icon={IconServer}
  label="Nodes"
  link="/infrastructure/nodes"
  currentPath={pathname}
/>
```

The link gets `data-active` when `link === currentPath`, applying the `convergeTeal` highlight.

### Collapsible group

When `links` is provided, renders a toggle button with a chevron and a `<Collapse>` containing child links:

```tsx
<NavbarLinksGroup
  icon={IconServer}
  label="Nodes"
  initiallyOpened={true}
  links={[
    { label: "Physical", link: "/infrastructure/nodes/physical" },
    { label: "Virtual",  link: "/infrastructure/nodes/virtual" },
  ]}
  currentPath={pathname}
/>
```

Each child link gets `data-active` when its `link === currentPath`.

## Styling

The component uses CSS Modules with three classes:

| Class | Applied to |
|-------|-----------|
| `.control` | The collapsible group toggle button |
| `.simple-link` | Simple (non-collapsible) link |
| `.collapsible-link` | Each child link inside a collapsed group |

All interactive states use `@mixin hover` from `postcss-preset-mantine` and the `convergeTeal` color token:
- **Hover**: `--mantine-color-convergeTeal-light` background
- **Active** (`data-active`): same background, persisted on the current route

Child links (`.collapsible-link`) are indented with `margin-left: xl` and have a left border using `--mantine-color-dark-4`.

The chevron rotates `−90deg` when the group is open via a `200ms ease` CSS transition.

## Using in a custom nav layout

```tsx
import { ScrollArea, Box } from "@mantine/core";
import { NavbarLinksGroup } from "@converge-cloudops/gaia-ui";
import { IconDashboard, IconSettings } from "@tabler/icons-react";
import { useLocation } from "react-router";

const links = [
  { icon: IconDashboard, label: "Dashboard", link: "/dashboard" },
  {
    icon: IconSettings,
    label: "Settings",
    links: [
      { label: "Profile",  link: "/settings/profile" },
      { label: "Security", link: "/settings/security" },
    ],
  },
];

export function CustomNav() {
  const { pathname } = useLocation();

  return (
    <ScrollArea>
      <Box>
        {links.map((item) => (
          <NavbarLinksGroup key={item.label} {...item} currentPath={pathname} />
        ))}
      </Box>
    </ScrollArea>
  );
}
```

## Notes

- `NavbarLinksGroup` always imports `Link` from `react-router`, so `react-router` must be installed even if you pass a static `currentPath`.
- The `icon` prop expects the icon **component** (e.g. `IconServer`), not a JSX element (`<IconServer />`). It is rendered internally with `size={18}`.
