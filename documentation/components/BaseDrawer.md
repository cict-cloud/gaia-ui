# BaseDrawer

A pre-styled right-side drawer built on Mantine's `Drawer`. Renders a composed title slot with an optional icon, title, and description — you only supply content as `children`.

## Import

```tsx
import { BaseDrawer } from "@converge-cloudops/gaia-ui";
```

## Props

Extends Mantine's `DrawerProps` (all Mantine `Drawer` props are accepted) with `title` overridden to `string` and the following additions:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Drawer heading text. |
| `description` | `string` | — | Optional subtitle rendered below the title in dimmed text. |
| `icon` | `Icon` | — | Optional Tabler icon rendered in a `ThemeIcon` beside the title. |
| `iconColor` | `MantineColor` | `"convergeTeal"` | Color of the icon's `ThemeIcon`. |
| `size` | `DrawerProps["size"]` | `"lg"` | Drawer width. |
| `...props` | `DrawerProps` | — | All other Mantine `Drawer` props (`opened`, `onClose`, `padding`, etc.). |

`position` is fixed to `"right"` and cannot be overridden.

## Basic example

```tsx
import { useState } from "react";
import { Button } from "@mantine/core";
import { BaseDrawer } from "@converge-cloudops/gaia-ui";
import { IconServer } from "@tabler/icons-react";

export function NodeDrawer() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>

      <BaseDrawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Node Details"
        description="View and edit node configuration"
        icon={IconServer}
      >
        {/* drawer content */}
      </BaseDrawer>
    </>
  );
}
```

## Without icon

```tsx
<BaseDrawer
  opened={opened}
  onClose={onClose}
  title="Filters"
>
  {children}
</BaseDrawer>
```

## Custom icon color

```tsx
<BaseDrawer
  opened={opened}
  onClose={onClose}
  title="Warning"
  description="This action may affect running services"
  icon={IconAlertTriangle}
  iconColor="orange"
>
  {children}
</BaseDrawer>
```

## Theming requirement

`iconColor` defaults to `"convergeTeal"`. Consuming apps must register `convergeTeal` as a custom color in their Mantine theme, otherwise the icon `ThemeIcon` falls back to the default color.
