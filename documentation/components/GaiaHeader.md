# GaiaHeader

The top header bar. Use it directly only if you manage your own `AppShell`; otherwise use [`GaiaShellLayout`](./GaiaShellLayout.md), which wires it up automatically.

## Import

```tsx
import { GaiaHeader } from "@converge-cloudops/gaia-ui";
```

## Props

| Prop           | Type                    | Default             | Description                                                                                       |
| -------------- | ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| `title`        | `string`                | `"GAIA"`            | Text displayed in the center of the header.                                                       |
| `logoSrc`      | `string`                | Built-in cloud logo | Path to the logo image.                                                                           |
| `logoAlt`      | `string`                | `"Logo"`            | Alt text for the logo image.                                                                      |
| `menuGroups`   | `GaiaHeaderMenuGroup[]` | `[]`                | Dropdown menu groups rendered left of center.                                                     |
| `rightSection` | `React.ReactNode`       | —                   | Slot for content on the right (e.g. user avatar, notifications).                                  |
| `burgerSlot`   | `React.ReactNode`       | —                   | Slot to inject a burger button. When used inside `GaiaShellLayout` this is handled automatically. |

### `GaiaHeaderMenuGroup`

```ts
interface GaiaHeaderMenuGroup {
  label: string; // Button label for the dropdown trigger
  items: GaiaHeaderMenuItem[];
}
```

### `GaiaHeaderMenuItem`

```ts
interface GaiaHeaderMenuItem {
  label: string;
  path: string;
}
```

## Layout

The header uses a `justify="space-between"` row layout:

```
[ burger? ] [ logo ] [ menu groups... ]     [ title ]     [ rightSection? ]
```

- **Left** — burger slot (if provided), logo image, dropdown menus
- **Center** — title (`<Title order={4}>`)
- **Right** — `rightSection` (if provided)

Background is `black` with a `1px` bottom border using `--mantine-color-dark-4`.

## Basic usage (inside your own AppShell)

```tsx
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GaiaHeader } from "@converge-cloudops/gaia-ui";

export function MyShell({ children }) {
  const [opened, { toggle }] = useDisclosure(false);

  const menuGroups = [
    {
      label: "Tropos",
      items: [
        { label: "Overview", path: "/tropos" },
        { label: "Topology", path: "/tropos/topology" },
      ],
    },
  ];

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 240, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <GaiaHeader
          title="My App"
          burgerSlot={
            <Burger
              opened={opened}
              onClick={toggle}
              color="white"
              size="sm"
              hiddenFrom="sm"
            />
          }
          menuGroups={menuGroups}
          rightSection={<UserButton />}
        />
      </AppShell.Header>
      {/* ... */}
    </AppShell>
  );
}
```

## Custom logo

```tsx
<GaiaHeader logoSrc="/assets/my-brand.svg" logoAlt="My Brand" title="My App" />
```

The logo is constrained to `max-width: 120px` and `max-height: 100%` with `fit="contain"` so any aspect ratio works.

## Header with no menus

```tsx
<GaiaHeader title="GAIA" />
```

## Multiple menu groups

```tsx
<GaiaHeader
  title="GAIA"
  menuGroups={[
    {
      label: "Tropos",
      items: [
        { label: "Overview", path: "/tropos" },
        { label: "Topology", path: "/tropos/topology" },
      ],
    },
    {
      label: "Stratos",
      items: [
        { label: "Clusters", path: "/stratos/clusters" },
        { label: "Workloads", path: "/stratos/workloads" },
      ],
    },
  ]}
/>
```

Each group renders as an independent `<Menu>` dropdown with a chevron-down icon trigger.
