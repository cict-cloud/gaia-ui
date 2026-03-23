# GaiaShellProvider

A React context provider that owns the authenticated user state and makes it — along with remote service configurations — available to the entire component tree.

Unlike a plain context provider, `GaiaShellProvider` manages `user` internally via `useState`. Consumers never pass `user` or `setUser` as props; they read and update the user through the hooks exported by [`GaiaShellContext`](./GaiaShellContext.md).

## Import

```ts
import { GaiaShellProvider } from "@converge-cloudops/gaia-ui";
import type { GaiaRemoteConfigs } from "@converge-cloudops/gaia-ui";
```

---

## Props

```ts
interface GaiaShellProviderProps {
  value: {
    remotes: GaiaRemoteConfigs;
  };
  children: React.ReactNode;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value.remotes` | `GaiaRemoteConfigs` | Yes | Remote service base URL map (see [`GaiaShellContext`](./GaiaShellContext.md#gaiaremoteconfigs)) |
| `children` | `React.ReactNode` | Yes | The component subtree that will have access to the context |

> `user` and `setUser` are **not** accepted as props — the provider creates and owns that state itself. To update the user, call [`useSetGaiaShellUser()`](./GaiaShellContext.md#usesetgaiashelluser) from any descendant component.

---

## Basic usage

```tsx
import { MantineProvider } from "@mantine/core";
import { GaiaShellProvider } from "@converge-cloudops/gaia-ui";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <GaiaShellProvider
        value={{
          remotes: {
            tropos: { baseUrl: "https://tropos.internal" },
            pleco: { baseUrl: "https://pleco.internal" },
          },
        }}
      >
        <RouterProvider router={router} />
      </GaiaShellProvider>
    </MantineProvider>
  );
}
```

`user` starts as `null`. Call `useSetGaiaShellUser()` inside a descendant component to populate it after authentication.

---

## Setting the user after login

Because `GaiaShellProvider` owns user state, the auth fetch happens inside the tree — typically in an initialisation component or after a login action.

```tsx
import { useEffect } from "react";
import { useSetGaiaShellUser } from "@converge-cloudops/gaia-ui";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setUser = useSetGaiaShellUser();

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then(setUser);
  }, []);

  return <>{children}</>;
}
```

Place `AuthInitializer` inside `GaiaShellProvider`:

```tsx
<GaiaShellProvider value={{ remotes: { tropos: { baseUrl: "https://tropos.internal" } } }}>
  <AuthInitializer>
    <RouterProvider router={router} />
  </AuthInitializer>
</GaiaShellProvider>
```

---

## Reading the user

Use the focused hooks rather than `useGaiaShellContext` when you only need one piece of state:

```tsx
import { useGaiaShellUser, useSetGaiaShellUser } from "@converge-cloudops/gaia-ui";

// Read only
const user = useGaiaShellUser();

// Write only
const setUser = useSetGaiaShellUser();
```

For permission checks:

```tsx
const user = useGaiaShellUser();
const canRead = user?.permissions.includes("inventory.az.read") ?? false;
```

---

## Placement in the tree

```
<MantineProvider>           ← Mantine styles and theming
  <GaiaShellProvider>       ← owns user state + remotes context
    <ReduxProvider>         ← (if using RTK Query)
      <TroposConfigProvider>← reads remotes, sets RTK Query base URL
        <RouterProvider>    ← routing
          <GaiaShellLayout> ← shell chrome
            <Outlet />      ← page content
```

`GaiaShellProvider` must be an ancestor of:
- Any component calling `useGaiaShellUser`, `useSetGaiaShellUser`, `useGaiaShellContext`, or `useGaiaRemoteConfig`
- Any `createRemoteConfigProvider`-generated provider (e.g. `TroposConfigProvider`)

---

## Notes

- `user` is initialised to `null` on every mount. If your app needs the user to persist across page refreshes, fetch and call `setUser` in an initialisation effect (see example above).
- `remotes` is not reactive — it is set once at mount via the `value` prop. If remote URLs change dynamically, re-mount the provider with an updated `value`.
