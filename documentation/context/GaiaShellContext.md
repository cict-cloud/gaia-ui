# GaiaShellContext

The React context that carries shared shell state — the authenticated user and remote service configurations — down to any component in the tree.

## Exports

```ts
import {
  GaiaShellContext,
  useGaiaShellContext,
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
| `permissions` | `string[]` | List of permission strings granted to the user (e.g. `"inventory.az.read"`, `"inventory.az.write"`) |

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
  remotes: GaiaRemoteConfigs;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `user` | `GaiaShellUser \| null` | The authenticated user, or `null` if unauthenticated |
| `remotes` | `GaiaRemoteConfigs` | Remote service base URL map |

---

## Hooks

### `useGaiaShellContext()`

Returns the full context value. Use this when you need access to both `user` and `remotes`.

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

function InventoryActions() {
  const { user } = useGaiaShellContext();

  const canWrite = user?.permissions.includes("inventory.az.write") ?? false;

  return (
    <div>
      <button disabled={!canWrite}>Add Item</button>
    </div>
  );
}
```

---

### `useGaiaRemoteConfig(remote)`

Returns the configuration for a single named remote service. Prefer this over `useGaiaShellContext` when you only need one remote's config — the type is narrowed to the specific service type.

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
  remotes: {},
}
```

This means `useGaiaRemoteConfig` will return `undefined` for all keys outside a provider. Always wrap your app (or at least the subtree that needs shell state) with [`GaiaShellProvider`](./GaiaShellProvider.md).

---

## Direct context access

`GaiaShellContext` is also exported for cases where you need to use `React.use()` or pass the context object directly (e.g. to a context bridge).

```ts
import { GaiaShellContext } from "@converge-cloudops/gaia-ui";
```
