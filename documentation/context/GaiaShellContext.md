# GaiaShellContext

The React context that carries shared shell state — the authenticated user, a setter for that user, and remote service configurations — down to any component in the tree.

## Exports

```ts
import {
  GaiaShellContext,
  useGaiaShellContext,
  useGaiaShellUser,
  useSetGaiaShellUser,
  useGaiaRemoteConfig,
} from "@converge-cloudops/gaia-ui";

import type {
  GaiaShellContextValue,
  GaiaShellUser,
  GaiaRemoteConfigs,
} from "@converge-cloudops/gaia-ui";
```

---

## Types

### `GaiaShellUser`

Represents the currently authenticated user.

```ts
interface GaiaShellUser {
  id: string;
  username: string;
  email: string;
  is_superuser: boolean;
  permissions: string[];
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique user identifier |
| `username` | `string` | Display username |
| `email` | `string` | User email address |
| `is_superuser` | `boolean` | Whether the user has superuser privileges |
| `permissions` | `string[]` | Permission strings granted to the user (e.g. `"inventory.az.read"`, `"inventory.az.write"`) |

---

### `GaiaRemoteConfigs`

A map of remote service configurations keyed by service name.

```ts
interface GaiaRemoteConfigs {
  tropos?: { baseUrl: string };
  pleco?: { baseUrl: string };
  // extensible — more systems can be added
}
```

| Key | Type | Description |
|-----|------|-------------|
| `tropos` | `{ baseUrl: string } \| undefined` | Base URL for the Tropos service |
| `pleco` | `{ baseUrl: string } \| undefined` | Base URL for the Pleco service |

---

### `GaiaShellContextValue`

The full value stored in the context.

```ts
interface GaiaShellContextValue {
  user: GaiaShellUser | null;
  setUser: (user: GaiaShellUser | null) => void;
  remotes: GaiaRemoteConfigs;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `user` | `GaiaShellUser \| null` | The authenticated user, or `null` if unauthenticated |
| `setUser` | `(user: GaiaShellUser \| null) => void` | Updates the user stored in `GaiaShellProvider`'s internal state |
| `remotes` | `GaiaRemoteConfigs` | Remote service base URL map |

> `user` and `setUser` are managed internally by [`GaiaShellProvider`](./GaiaShellProvider.md). Consumers do not pass these as props — they read and update them via the hooks below.

---

## Hooks

### `useGaiaShellContext()`

Returns the full context value. Use this when you need access to `user`, `setUser`, and `remotes` together.

```ts
function useGaiaShellContext(): GaiaShellContextValue
```

**Example**

```tsx
import { useGaiaShellContext } from "@converge-cloudops/gaia-ui";

function UserGreeting() {
  const { user } = useGaiaShellContext();

  if (!user) return <span>Guest</span>;
  return <span>Hello, {user.username}</span>;
}
```

---

### `useGaiaShellUser()`

Returns only the current user. Prefer this over `useGaiaShellContext` when you only need to read the user.

```ts
function useGaiaShellUser(): GaiaShellUser | null
```

**Example**

```tsx
import { useGaiaShellUser } from "@converge-cloudops/gaia-ui";

function InventoryActions() {
  const user = useGaiaShellUser();

  const canWrite = user?.permissions.includes("inventory.az.write") ?? false;

  return <button disabled={!canWrite}>Add Item</button>;
}
```

---

### `useSetGaiaShellUser()`

Returns the `setUser` setter from the context. Use this to update the authenticated user after a login or logout.

```ts
function useSetGaiaShellUser(): (user: GaiaShellUser | null) => void
```

**Example**

```tsx
import { useSetGaiaShellUser } from "@converge-cloudops/gaia-ui";

function LoginButton() {
  const setUser = useSetGaiaShellUser();

  async function handleLogin() {
    const res = await fetch("/api/login", { method: "POST", credentials: "include" });
    const user = await res.json();
    setUser(user);
  }

  return <button onClick={handleLogin}>Log in</button>;
}

function LogoutButton() {
  const setUser = useSetGaiaShellUser();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  }

  return <button onClick={handleLogout}>Log out</button>;
}
```

---

### `useGaiaRemoteConfig(remote)`

Returns the configuration for a single named remote service. The return type is narrowed to the specific service's config type.

```ts
function useGaiaRemoteConfig<K extends keyof GaiaRemoteConfigs>(
  remote: K
): GaiaRemoteConfigs[K]
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `remote` | `keyof GaiaRemoteConfigs` | The remote service key to retrieve |

**Returns** `{ baseUrl: string } | undefined` for the requested service.

**Example**

```tsx
import { useGaiaRemoteConfig } from "@converge-cloudops/gaia-ui";

function TroposWidget() {
  const tropos = useGaiaRemoteConfig("tropos");

  if (!tropos) return null;
  return <a href={tropos.baseUrl}>Open Tropos</a>;
}
```

---

## Default context value

When no `GaiaShellProvider` is present in the tree, the context falls back to:

```ts
{
  user: null,
  setUser: () => {},
  remotes: {},
}
```

`setUser` is a no-op outside a provider. Always wrap your app with [`GaiaShellProvider`](./GaiaShellProvider.md) before calling any of the hooks above.

---

## Direct context access

`GaiaShellContext` is also exported for cases where you need to use `React.use()` or pass the context object directly (e.g. to a context bridge).

```ts
import { GaiaShellContext } from "@converge-cloudops/gaia-ui";
```
