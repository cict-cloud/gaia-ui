# BaseModal

A pre-styled modal built on Mantine's `Modal`. Renders a composed title slot with an optional icon, title, and description — you only supply content as `children`.

## Import

```tsx
import { BaseModal } from "@converge-cloudops/gaia-ui";
```

## Props

Extends Mantine's `ModalProps` (all Mantine `Modal` props are accepted) with `title` overridden to `string` and the following additions:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Modal heading text. |
| `description` | `string` | — | Optional subtitle rendered below the title in dimmed text. |
| `icon` | `Icon` | — | Optional Tabler icon rendered in a `ThemeIcon` beside the title. |
| `iconColor` | `MantineColor` | `"convergeTeal"` | Color of the icon's `ThemeIcon`. |
| `...props` | `ModalProps` | — | All other Mantine `Modal` props (`opened`, `onClose`, `size`, `centered`, etc.). |

## Basic example

```tsx
import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { BaseModal } from "@converge-cloudops/gaia-ui";
import { IconUsers } from "@tabler/icons-react";

export function CreateUserModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Create User</Button>

      <BaseModal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create User"
        description="Add a new user to the system"
        icon={IconUsers}
      >
        <TextInput label="Username" placeholder="Enter username" />
        {/* form content */}
      </BaseModal>
    </>
  );
}
```

## Without icon

```tsx
<BaseModal
  opened={opened}
  onClose={onClose}
  title="Export Data"
>
  {children}
</BaseModal>
```

## Custom icon color

```tsx
<BaseModal
  opened={opened}
  onClose={onClose}
  title="Upload File"
  description="Accepted formats: CSV, JSON"
  icon={IconUpload}
  iconColor="blue"
>
  {children}
</BaseModal>
```

## Theming requirement

`iconColor` defaults to `"convergeTeal"`. Consuming apps must register `convergeTeal` as a custom color in their Mantine theme, otherwise the icon `ThemeIcon` falls back to the default color.
