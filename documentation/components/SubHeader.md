# SubHeader

A secondary bar rendered inside `AppShell.Main`, just above the page content. Use it to display the current page title and optional actions (buttons, breadcrumbs, tabs, etc.).

## Import

```tsx
import { SubHeader } from "@converge-cloudops/gaia-ui";
import type { SubHeaderProps } from "@converge-cloudops/gaia-ui";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page or section title displayed on the left. |
| `content` | `React.ReactNode` | — | Optional slot on the right for actions, breadcrumbs, tabs, etc. |

## Layout

```
┌─────────────────────────────────────────────────┐
│  Page Title                      [ content... ] │  ← white, 50px tall
└─────────────────────────────────────────────────┘
  [  main page content / children  ]
```

The bar has a white background (`bg="white"`) and a fixed height of `50px`. Title is left-aligned (`<Title order={5}>`), content is right-aligned inside a `<Group>`.

## Usage via GaiaShellLayout

The recommended way to use `SubHeader` is through `GaiaShellLayout`'s `subHeaderProps`. It is optional — omit it and no sub-header renders.

```tsx
import { GaiaShellLayout } from "@converge-cloudops/gaia-ui";
import { Button } from "@mantine/core";

<GaiaShellLayout
  headerProps={{ title: "GAIA" }}
  navbarProps={{ sections, resolveSection }}
  subHeaderProps={{
    title: "Nodes",
    content: <Button size="xs">Add Node</Button>,
  }}
>
  {/* page content */}
</GaiaShellLayout>
```

## Usage as a standalone component

Use `SubHeader` directly if you manage your own `AppShell`:

```tsx
import { SubHeader } from "@converge-cloudops/gaia-ui";
import { Button, Group } from "@mantine/core";

<SubHeader
  title="Infrastructure / Nodes"
  content={
    <Group gap="xs">
      <Button variant="outline" size="xs">Export</Button>
      <Button size="xs">Add Node</Button>
    </Group>
  }
/>
```

## With no right content

```tsx
<SubHeader title="Overview" />
```
