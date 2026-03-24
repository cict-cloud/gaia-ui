# createRemoteConfigProvider

A factory that returns a React provider component which reads a remote service's base URL from [`GaiaShellContext`](../context/GaiaShellContext.md) and pushes it into an RTK Query base query before rendering its children.

Use this alongside [`createRemoteBaseQuery`](./createRemoteBaseQuery.md) to wire remote URLs from the shell context into your RTK Query APIs automatically.

## Import

```ts
import { createRemoteConfigProvider } from "@converge-cloudops/gaia-ui";
```

---

## Signature

```ts
function createRemoteConfigProvider(
  remote: keyof GaiaRemoteConfigs,
  setBaseUrl: (url: string) => void,
  standaloneUrl: string
): ({ children }: { children: ReactNode }) => JSX.Element | null
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `remote` | `keyof GaiaRemoteConfigs` | Yes | The remote service key to read from `GaiaShellContext` (e.g. `"tropos"`, `"pleco"`) |
| `setBaseUrl` | `(url: string) => void` | Yes | The setter returned by `createRemoteBaseQuery` — called with the resolved URL |
| `standaloneUrl` | `string` | Yes | Fallback URL used when no config for `remote` is present in the context (e.g. local dev URL) |

### Returns

A React component `RemoteConfigProvider` with the signature:

```ts
function RemoteConfigProvider({ children }: { children: ReactNode }): JSX.Element | null
```

---

## Behaviour

1. On mount (and whenever `config?.baseUrl` changes), calls `setBaseUrl` with either the context-provided URL or `standaloneUrl` as fallback.
2. Renders `null` until `setBaseUrl` has been called once — preventing children from firing requests against a stale URL.
3. After the first `setBaseUrl` call, renders children normally.

---

## Basic usage

### 1. Create the API and provider

Define your RTK Query API and the config provider in the same module. **All three must be exported** so that `App.tsx` (and any other file in the consuming app) can import them.

```ts
// troposApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { createRemoteBaseQuery, createRemoteConfigProvider } from "@converge-cloudops/gaia-ui";

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

export const TroposConfigProvider = createRemoteConfigProvider(
  "tropos",
  setBaseUrl,
  "http://localhost:8000"
);
```

> `TroposConfigProvider` must be exported from `troposApi.ts` so it can be imported in `App.tsx`. Without the export the component is not accessible outside its module.

### 2. Wrap your app

`TroposConfigProvider` must be placed **inside** `GaiaShellProvider` so it can read the context, and **outside** any component that calls the `troposApi` hooks.

```tsx
// App.tsx
import { MantineProvider } from "@mantine/core";
import { GaiaShellProvider } from "@converge-cloudops/gaia-ui";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { TroposConfigProvider } from "./troposApi";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <GaiaShellProvider
        value={{
          remotes: {
            tropos: { baseUrl: "https://tropos.internal" },
          },
        }}
      >
        <ReduxProvider store={store}>
          <TroposConfigProvider>
            <RouterProvider router={router} />
          </TroposConfigProvider>
        </ReduxProvider>
      </GaiaShellProvider>
    </MantineProvider>
  );
}
```

### 3. Use the API in components

Once children are rendered, `troposApi` is already pointed at the correct URL:

```tsx
import { troposApi } from "./troposApi";

function InventoryPage() {
  const { data, isLoading } = troposApi.useGetInventoryQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

---

## Multiple remotes

Each remote gets its own provider, created separately. Export everything from the module so it is accessible to `App.tsx` and any component file that calls the RTK Query hooks:

```ts
// plecoApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { createRemoteBaseQuery, createRemoteConfigProvider } from "@converge-cloudops/gaia-ui";

export const { baseQuery: plecoBaseQuery, setBaseUrl: setPlecoBaseUrl } =
  createRemoteBaseQuery("http://localhost:8001", "api/v1");

export const plecoApi = createApi({
  reducerPath: "plecoApi",
  baseQuery: plecoBaseQuery,
  endpoints: (builder) => ({
    // ...
  }),
});

export const PlecoConfigProvider = createRemoteConfigProvider(
  "pleco",
  setPlecoBaseUrl,
  "http://localhost:8001"
);
```

Nest the providers in the tree:

```tsx
<GaiaShellProvider value={shellValue}>
  <ReduxProvider store={store}>
    <TroposConfigProvider>
      <PlecoConfigProvider>
        <RouterProvider router={router} />
      </PlecoConfigProvider>
    </TroposConfigProvider>
  </ReduxProvider>
</GaiaShellProvider>
```

---

## Provider placement rules

| Constraint | Reason |
|------------|--------|
| Must be inside `GaiaShellProvider` | Calls `useGaiaRemoteConfig` internally |
| Must be outside components that call RTK Query hooks | Children are withheld (`null`) until the URL is set |
| Order between sibling providers does not matter | Each reads its own context key independently |
