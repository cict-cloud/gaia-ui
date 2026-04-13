# TableActions

A compact row-action button group for use inside a `BaseTable` column. Renders up to three icon buttons — view, update, and delete — and lets you include only the actions relevant to a given table.

## Import

```tsx
import { TableActions } from "@converge-cloudops/gaia-ui";
import type { TableActionsProps, TableAction } from "@converge-cloudops/gaia-ui";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `(action: TableAction) => void` | — | Called with the action type when a button is clicked |
| `include` | `TableAction[]` | `["view", "update", "delete"]` | Which buttons to render, in declaration order |
| `justify` | `GroupProps["justify"]` | `"flex-start"` | Mantine `Group` justify value for button alignment |

### `TableAction`

```ts
type TableAction = "view" | "update" | "delete";
```

## Icon mapping

| Action | Icon | Default color |
|--------|------|---------------|
| `"view"` | `IconEye` | Mantine default |
| `"update"` | `IconEditFilled` | `--gaia-action-edit` → fallback `--mantine-color-yellow-6` |
| `"delete"` | `IconTrash` | `--gaia-action-delete` → fallback `--mantine-color-red-6` |

## Theming requirement

`TableActions` reads `--gaia-action-edit` and `--gaia-action-delete` from the Mantine CSS variable layer. Add the following `cssVariablesResolver` to your app's dedicated theme object so the colors resolve correctly in both light and dark mode:

```ts
import { createTheme, type CSSVariablesResolver } from "@mantine/core";

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--gaia-action-edit": theme.colors.orange[6],
    "--gaia-action-delete": theme.colors.red[6],
  },
  dark: {
    "--gaia-action-edit": theme.colors.orange[4],
    "--gaia-action-delete": theme.colors.red[4],
  },
});
```

Then pass it to `MantineProvider`:

```tsx
import { MantineProvider } from "@mantine/core";
import { theme, cssVariablesResolver } from "./theme";

<MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver}>
  {children}
</MantineProvider>
```

> If you skip this step the component still renders — the CSS variable fallbacks (`yellow-6` / `red-6`) will be used instead.

## Basic usage inside a BaseTable column

```tsx
import { BaseTable, TableActions } from "@converge-cloudops/gaia-ui";
import type { TableMetaTypes, DataTableColumn } from "@converge-cloudops/gaia-ui";

interface Server {
  id: string;
  name: string;
}

const columns: DataTableColumn<Server>[] = [
  { accessor: "name", title: "Name" },
  {
    accessor: "id",
    title: "",
    render: (row) => (
      <TableActions
        onClick={(action) => {
          if (action === "view")   navigate(`/servers/${row.id}`);
          if (action === "update") openEditModal(row);
          if (action === "delete") openDeleteConfirm(row);
        }}
      />
    ),
  },
];
```

## Showing a subset of actions

```tsx
// View only
<TableActions include={["view"]} onClick={handleAction} />

// No delete
<TableActions include={["view", "update"]} onClick={handleAction} />
```
