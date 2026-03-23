# createRemoteBaseQuery

A factory that creates an RTK Query `baseQuery` whose base URL can be updated at runtime. This is needed in micro-frontend / remote-library setups where the target service URL is not known at build time — it arrives later via [`GaiaShellProvider`](../context/GaiaShellProvider.md).

## Import

```ts
import { createRemoteBaseQuery } from "@converge-cloudops/gaia-ui";
```

---

## Signature

```ts
function createRemoteBaseQuery(
  standaloneUrl: string,
  path?: string
): {
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
  setBaseUrl: (url: string) => void;
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `standaloneUrl` | `string` | Yes | Fallback base URL used when no remote config is provided by `GaiaShellProvider` (e.g. local dev URL) |
| `path` | `string` | No | Optional path segment appended to the base URL (e.g. `"api/v1"`). Results in `{baseUrl}/{path}` |

### Returns

| Field | Type | Description |
|-------|------|-------------|
| `baseQuery` | `BaseQueryFn` | RTK Query-compatible base query function, passed to `createApi` |
| `setBaseUrl` | `(url: string) => void` | Mutates the base URL used by subsequent requests. Called by [`createRemoteConfigProvider`](./createRemoteConfigProvider.md) |

---

## Behaviour

- On every request, `baseQuery` reads the current value of `_baseUrl` (initialised to `standaloneUrl`).
- All requests are sent with `credentials: "include"` so session cookies are forwarded automatically.
- Calling `setBaseUrl` updates `_baseUrl` in place — no re-initialisation of the RTK Query API is required.

---

## Basic usage

```ts
// troposApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { createRemoteBaseQuery } from "@converge-cloudops/gaia-ui";

export const { baseQuery, setBaseUrl } = createRemoteBaseQuery(
  "http://localhost:8000",
  "api/v1"
);

export const troposApi = createApi({
  reducerPath: "troposApi",
  baseQuery,
  endpoints: (builder) => ({
    getInventory: builder.query<InventoryItem[], void>({
      query: () => "/inventory/az/",
    }),
  }),
});
```

At this point `troposApi` will call `http://localhost:8000/api/v1/inventory/az/` until `setBaseUrl` is called with a different URL.

---

## Wiring the base URL from context

Pass `setBaseUrl` to [`createRemoteConfigProvider`](./createRemoteConfigProvider.md) so the URL is overridden with whatever value `GaiaShellProvider` supplies at runtime:

```ts
// TroposConfigProvider.ts
import { createRemoteConfigProvider } from "@converge-cloudops/gaia-ui";
import { setBaseUrl } from "./troposApi";

export const TroposConfigProvider = createRemoteConfigProvider(
  "tropos",
  setBaseUrl,
  "http://localhost:8000"
);
```

Then wrap the parts of your app that depend on the Tropos API:

```tsx
// App.tsx
import { TroposConfigProvider } from "./TroposConfigProvider";

export default function App() {
  return (
    <TroposConfigProvider>
      <RouterProvider router={router} />
    </TroposConfigProvider>
  );
}
```

---

## Peer dependency

`createRemoteBaseQuery` depends on `@reduxjs/toolkit`. Your project must have it installed:

```bash
npm install @reduxjs/toolkit react-redux
```

It is not listed as a peer dependency of `gaia-ui` — it is only needed in projects that use the RTK Query integration.
