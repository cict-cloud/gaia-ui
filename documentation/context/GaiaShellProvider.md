# GaiaShellProvider

A thin React context provider that injects the authenticated user and remote service configurations into the component tree. Wrap your app (or any subtree) with this component to make shell context available to all descendants.

## Import

```ts
import { GaiaShellProvider } from "@converge-cloudops/gaia-ui";
import type { GaiaShellContextValue } from "@converge-cloudops/gaia-ui";
```

---

## Props

```ts
interface GaiaShellProviderProps {
  value: GaiaShellContextValue;
  children: React.ReactNode;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `GaiaShellContextValue` | Yes | The context value to provide — contains `user` and `remotes` |
| `children` | `React.ReactNode` | Yes | The component subtree that will have access to the context |

See [`GaiaShellContext`](./GaiaShellContext.md) for the full `GaiaShellContextValue` type definition.

---

## Basic usage

```tsx
import { MantineProvider } from "@mantine/core";
import { GaiaShellProvider } from "@converge-cloudops/gaia-ui";

const shellValue = {
  user: {
    id: "1",
    username: "jdoe",
    email: "jdoe@example.com",
    is_superuser: false,
    permissions: ["inventory.az.read", "inventory.az.write", "tropos.network.read"],
  },
  remotes: {
    tropos: { baseUrl: "https://tropos.internal" },
    pleco: { baseUrl: "https://pleco.internal" },
  },
};

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <GaiaShellProvider value={shellValue}>
        <RouterProvider router={router} />
      </GaiaShellProvider>
    </MantineProvider>
  );
}
```

---

## Usage with dynamic user data

In practice the `user` object comes from an auth fetch. Pass `null` while loading and supply the resolved user once the request completes.

```tsx
import { useState, useEffect } from "react";
import { GaiaShellProvider } from "@converge-cloudops/gaia-ui";
import type { GaiaShellUser } from "@converge-cloudops/gaia-ui";

export default function App() {
  const [user, setUser] = useState<GaiaShellUser | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then(setUser);
  }, []);

  return (
    <GaiaShellProvider
      value={{
        user,
        remotes: {
          tropos: { baseUrl: import.meta.env.VITE_TROPOS_URL },
        },
      }}
    >
      <RouterProvider router={router} />
    </GaiaShellProvider>
  );
}
```

---

## Consuming the context

Use the hooks exported from [`GaiaShellContext`](./GaiaShellContext.md) in any descendant component:

```tsx
import { useGaiaShellContext, useGaiaRemoteConfig } from "@converge-cloudops/gaia-ui";

// Access full context
const { user, remotes } = useGaiaShellContext();

// Access a single remote config (type-narrowed)
const tropos = useGaiaRemoteConfig("tropos");
```

---

## Placement in the tree

`GaiaShellProvider` must be an ancestor of any component that calls `useGaiaShellContext` or `useGaiaRemoteConfig`. Place it as high as needed — typically at the app root, just inside `MantineProvider`.

```
<MantineProvider>           ← Mantine styles and theming
  <GaiaShellProvider>       ← user + remotes context
    <RouterProvider>        ← routing
      <GaiaShellLayout>     ← shell chrome
        <Outlet />          ← page content
```

---

## Notes

- `GaiaShellProvider` is purely a context provider — it holds no internal state and performs no fetching. All state management (auth, remote URLs) lives in the consuming application.
- Without a `GaiaShellProvider` in the tree, hooks fall back to `{ user: null, remotes: {} }`. This is safe for isolated component rendering (e.g., Storybook) but means all remote config lookups will return `undefined`.
