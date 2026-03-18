# GaiaShellLayout

The recommended way to use gaia-ui. Wraps Mantine's `AppShell` and wires together `GaiaHeader`, `GaiaNavbar`, `SubHeader`, and the mobile burger toggle — you only need to provide props and children.

## Import

```tsx
import { GaiaShellLayout } from "@converge-cloudops/gaia-ui";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerProps` | `Omit<GaiaHeaderProps, "burgerSlot">` | — | Props forwarded to `GaiaHeader`. `burgerSlot` is managed internally. |
| `navbarProps` | `GaiaNavbarProps` | — | Props forwarded to `GaiaNavbar`. |
| `subHeaderProps` | `{ title?: string; content?: React.ReactNode }` | — | Optional. When provided, renders a `SubHeader` above the page content. Title is auto-resolved from the active nav link — only pass `content` for right-side controls, or `title` to override. |
| `headerHeight` | `number` | `50` | Header height in pixels. |
| `navbarWidth` | `number` | `240` | Navbar width in pixels. |
| `navbarBreakpoint` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Breakpoint below which the navbar collapses and the burger appears. |
| `children` | `React.ReactNode` | — | Page content rendered inside a fluid `Container`. |

`navbarProps` takes `{ sections, resolveSection }` — see [GaiaNavbar](./GaiaNavbar.md) for details.

## Behavior

- **Mobile burger** — a `<Burger>` is created internally and injected into the header via `GaiaHeader`'s `burgerSlot`. It is hidden above `navbarBreakpoint` and toggles the navbar on smaller screens.
- **Disclosure state** — `useDisclosure` from `@mantine/hooks` manages the open/close state. You do not need to manage this yourself.
- **Route tracking** — both `GaiaShellLayout` and `GaiaNavbar` read the current pathname via `useLocation()`. **`react-router` is required.**
- **SubHeader title auto-resolution** — when `subHeaderProps` is provided, the title is resolved automatically by matching the current pathname against the active section's links (including nested children). Falls back to the section title if no link matches. Pass `title` explicitly to override.
- **No border** — `AppShell` is rendered with `withBorder={false}` and `padding={0}`; padding is provided by the inner `Container` (`p="md"`).
- **Main area** — `AppShell.Main` has a `#f0f0f0` background. Children are wrapped in a fluid `Container` with `p="md"`.

## Basic example

```tsx
import { GaiaShellLayout, GaiaNavbarSection } from "@converge-cloudops/gaia-ui";
import { IconLayoutDashboard, IconChartBar, IconServer } from "@tabler/icons-react";

const sections: GaiaNavbarSection[] = [
  {
    title: "Dashboard",
    links: [
      { icon: IconLayoutDashboard, label: "Overview", link: "/dashboard" },
      { icon: IconChartBar, label: "Analytics", link: "/dashboard/analytics" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { icon: IconServer, label: "Nodes", link: "/infrastructure/nodes" },
    ],
  },
];

export function AppLayout({ children }) {
  return (
    <GaiaShellLayout
      headerProps={{
        title: "GAIA",
        menuGroups: [
          {
            label: "Tropos",
            items: [
              { label: "Overview", onClick: () => {} },
              { label: "Topology", onClick: () => {} },
            ],
          },
        ],
      }}
      navbarProps={{
        sections,
        resolveSection: (pathname) => {
          if (pathname.startsWith("/infrastructure")) return "Infrastructure";
          return "Dashboard";
        },
      }}
    >
      {children}
    </GaiaShellLayout>
  );
}
```

## With SubHeader (auto title)

Omit `title` — it is resolved automatically from the active nav link:

```tsx
import { Button } from "@mantine/core";

<GaiaShellLayout
  headerProps={{ title: "GAIA" }}
  navbarProps={{ sections, resolveSection }}
  subHeaderProps={{
    content: <Button size="xs">Add Node</Button>,
  }}
>
  {children}
</GaiaShellLayout>
```

When the current path is `/infrastructure/nodes`, the SubHeader title will automatically show `"Nodes"`.

## With SubHeader (explicit title override)

Pass `title` to override the auto-resolved value:

```tsx
<GaiaShellLayout
  headerProps={{ title: "GAIA" }}
  navbarProps={{ sections, resolveSection }}
  subHeaderProps={{ title: "Custom Page Title" }}
>
  {children}
</GaiaShellLayout>
```

## With custom header logo and right section

```tsx
import { Avatar } from "@mantine/core";

<GaiaShellLayout
  headerProps={{
    logoSrc: "/my-logo.png",
    logoAlt: "My App",
    title: "My App",
    rightSection: <Avatar src="/user.png" radius="xl" />,
  }}
  navbarProps={{ sections, resolveSection }}
  headerHeight={60}
  navbarWidth={260}
>
  {children}
</GaiaShellLayout>
```

## Hiding the navbar on certain routes

Return a non-matching string from `resolveSection` to render no navbar:

```tsx
navbarProps={{
  sections,
  resolveSection: (pathname) => {
    if (pathname === "/login") return "";  // no navbar on login
    if (pathname.startsWith("/infrastructure")) return "Infrastructure";
    return "Dashboard";
  },
}}
```
