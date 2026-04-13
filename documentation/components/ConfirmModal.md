# ConfirmModal

A focused confirmation modal for destructive or irreversible actions. Fixed layout: red icon, title, description, and Cancel / confirm buttons. No close button — the user must explicitly choose an action.

## Import

```tsx
import { ConfirmModal } from "@converge-cloudops/gaia-ui";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `opened` | `boolean` | — | **Required.** Controls modal visibility. |
| `onClose` | `() => void` | — | **Required.** Called when Cancel is clicked. |
| `onConfirm` | `() => void` | — | **Required.** Called when the confirm button is clicked. |
| `title` | `string` | — | **Required.** Modal heading text. |
| `description` | `string` | — | **Required.** Supporting text explaining the action. |
| `confirmLabel` | `string` | `"Delete"` | Label for the confirm button. |
| `isLoading` | `boolean` | `false` | When `true`, the confirm button shows a spinner and Cancel is disabled. |
| `icon` | `Icon` | `IconAlertTriangle` | Tabler icon shown in the red `ThemeIcon`. |

## Basic example

```tsx
import { useState } from "react";
import { Button } from "@mantine/core";
import { ConfirmModal } from "@converge-cloudops/gaia-ui";

export function DeleteUserButton({ userId }: { userId: string }) {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm() {
    setIsLoading(true);
    await deleteUser(userId);
    setIsLoading(false);
    setOpened(false);
  }

  return (
    <>
      <Button color="red" onClick={() => setOpened(true)}>Delete</Button>

      <ConfirmModal
        opened={opened}
        onClose={() => setOpened(false)}
        onConfirm={handleConfirm}
        title="Delete User"
        description="This action cannot be undone. The user and all associated data will be permanently removed."
        isLoading={isLoading}
      />
    </>
  );
}
```

## Custom confirm label and icon

```tsx
import { IconPower } from "@tabler/icons-react";

<ConfirmModal
  opened={opened}
  onClose={onClose}
  onConfirm={handleConfirm}
  title="Shut Down Node"
  description="The node will stop accepting traffic immediately."
  confirmLabel="Shut Down"
  icon={IconPower}
/>
```

## Notes

- The icon `ThemeIcon` is always `color="red"` — this is intentional to signal a destructive action.
- `size` is fixed to `"sm"` and `withCloseButton` is always `false`.
- Use `BaseModal` instead if you need a general-purpose modal with form content and a custom action layout.
