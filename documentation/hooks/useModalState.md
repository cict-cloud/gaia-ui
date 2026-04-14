# useModalState

A generic hook that pairs `useDisclosure` with a typed data state. Use it to open `BaseModal`, `BaseDrawer`, or `ConfirmModal` with a specific record — the data is held alongside the open/close state so you never need a separate `useState` for it.

## Import

```tsx
import { useModalState } from "@converge-cloudops/gaia-ui";
```

## Signature

```ts
function useModalState<T>(): {
  data: T | null;
  opened: boolean;
  openWith: (value: T) => void;
  close: () => void;
  onExited: () => void;
}
```

## Return values

| Value | Type | Description |
|-------|------|-------------|
| `data` | `T \| null` | The value passed to `openWith`. `null` when closed. |
| `opened` | `boolean` | Whether the modal/drawer is open. |
| `openWith` | `(value: T) => void` | Sets `data` and opens the modal in one call. |
| `close` | `() => void` | Closes the modal. `data` is still set until `onExited` is called. |
| `onExited` | `() => void` | Clears `data` after the modal finishes its exit animation. Pass to `onExited` on the Mantine `Modal` or `Drawer`. |

> Call `onExited` rather than clearing data on `close` so the data remains available during the closing animation — avoiding a content flash.

## Basic example — with BaseModal

```tsx
import { useModalState, BaseModal } from "@converge-cloudops/gaia-ui";
import { IconUsers } from "@tabler/icons-react";

type User = { id: string; name: string };

export function UsersPage({ users }: { users: User[] }) {
  const editModal = useModalState<User>();

  return (
    <>
      {users.map((user) => (
        <button key={user.id} onClick={() => editModal.openWith(user)}>
          Edit {user.name}
        </button>
      ))}

      <BaseModal
        opened={editModal.opened}
        onClose={editModal.close}
        onExited={editModal.onExited}
        title="Edit User"
        icon={IconUsers}
      >
        {editModal.data && <UserForm user={editModal.data} />}
      </BaseModal>
    </>
  );
}
```

## With ConfirmModal

```tsx
import { useModalState, ConfirmModal } from "@converge-cloudops/gaia-ui";

type User = { id: string; name: string };

export function UsersTable({ users }: { users: User[] }) {
  const deleteModal = useModalState<User>();

  async function handleConfirm() {
    await deleteUser(deleteModal.data!.id);
    deleteModal.close();
  }

  return (
    <>
      {users.map((user) => (
        <button key={user.id} onClick={() => deleteModal.openWith(user)}>
          Delete
        </button>
      ))}

      <ConfirmModal
        opened={deleteModal.opened}
        onClose={deleteModal.close}
        onConfirm={handleConfirm}
        title="Delete User"
        description={`"${deleteModal.data?.name}" will be permanently removed.`}
      />
    </>
  );
}
```

## With BaseDrawer

```tsx
import { useModalState, BaseDrawer } from "@converge-cloudops/gaia-ui";
import { IconServer } from "@tabler/icons-react";

type Node = { id: string; hostname: string };

export function NodesTable({ nodes }: { nodes: Node[] }) {
  const detailDrawer = useModalState<Node>();

  return (
    <>
      {nodes.map((node) => (
        <button key={node.id} onClick={() => detailDrawer.openWith(node)}>
          View
        </button>
      ))}

      <BaseDrawer
        opened={detailDrawer.opened}
        onClose={detailDrawer.close}
        onExited={detailDrawer.onExited}
        title={detailDrawer.data?.hostname ?? ""}
        description="Node details"
        icon={IconServer}
      >
        {detailDrawer.data && <NodeDetail node={detailDrawer.data} />}
      </BaseDrawer>
    </>
  );
}
```
