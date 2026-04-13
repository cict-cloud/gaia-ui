# BaseTable

A generic, reusable data table built on [`mantine-datatable`](https://icflorescu.github.io/mantine-datatable/). Supports pagination, row selection, row click handlers, and last-column pinning. It is independent of the shell layout and can be dropped into any remote UI library that consumes `@converge-cloudops/gaia-ui`.

## Peer dependency

`mantine-datatable ^8.3.13` must be installed in the consuming project.

```bash
npm install mantine-datatable
```

## Import

```tsx
import { BaseTable } from "@converge-cloudops/gaia-ui";
import type {
  TableMetaTypes,
  PaginationMeta,
  DataTableColumn,
} from "@converge-cloudops/gaia-ui";
```

## Props

`BaseTable` takes a single `tableMeta` prop of type `TableMetaTypes<T>`.

```tsx
<BaseTable<MyRow> tableMeta={tableMeta} />
```

### `TableMetaTypes<T>`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `records` | `T[]` | — | Row data |
| `columns` | `DataTableColumn<T>[]` | — | Column definitions (from `mantine-datatable`) |
| `fetching` | `boolean` | — | Shows a loading overlay when `true` |
| `idAccessor` | `string` | `undefined` | Field name used as the row key |
| `pagination` | `PaginationMeta` | `undefined` | Pass to enable pagination controls |
| `selectable` | `boolean` | `false` | Enables checkbox row selection |
| `pinLastColumn` | `boolean` | `false` | Pins the last column to the right edge |
| `onRowClick` | `(record: T) => void` | `undefined` | Called when a row is clicked |

### `PaginationMeta`

| Field | Type | Description |
|-------|------|-------------|
| `page` | `number` | Current page (1-indexed) |
| `totalRecords` | `number` | Total number of records across all pages |
| `recordsPerPage` | `number` | Current page size |
| `recordsPerPageOptions` | `number[]` | Available page-size options |
| `onRecordsPerPageChange` | `(n: number) => void` | Called when the user changes page size |
| `onPageChange` | `(page: number) => void` | Called when the user navigates to a page |

## Height behaviour

- When `pagination` is omitted and there are 10 or more records, the table fixes its height to show exactly 10 rows (header + 10 × 55 px rows) and scrolls internally.
- When `pagination` is provided, height is unrestricted and the pagination bar is shown below the table.
- When `records` is empty, a minimum height of 150 px is applied so the empty state is visible.

## Theming requirement

The row hover color uses `--mantine-color-convergeTeal-7`. Your Mantine theme must register `convergeTeal` as a custom color, otherwise the hover highlight silently falls back to the default.

```ts
// In your MantineProvider theme
import { createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    convergeTeal: [ /* 10-shade palette */ ],
  },
});
```

## Basic usage

```tsx
import { useState } from "react";
import { BaseTable, TableMetaTypes, PaginationMeta } from "@converge-cloudops/gaia-ui";
import type { DataTableColumn } from "@converge-cloudops/gaia-ui";

interface Server {
  id: string;
  name: string;
  status: string;
}

const columns: DataTableColumn<Server>[] = [
  { accessor: "name", title: "Name" },
  { accessor: "status", title: "Status" },
];

export function ServersTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const tableMeta: TableMetaTypes<Server> = {
    records: [
      { id: "1", name: "web-01", status: "Running" },
      { id: "2", name: "db-01",  status: "Stopped" },
    ],
    columns,
    fetching: false,
    idAccessor: "id",
    pagination: {
      page,
      totalRecords: 2,
      recordsPerPage: pageSize,
      recordsPerPageOptions: [10, 25, 50],
      onPageChange: setPage,
      onRecordsPerPageChange: setPageSize,
    },
  };

  return <BaseTable<Server> tableMeta={tableMeta} />;
}
```

## With row selection

```tsx
const tableMeta: TableMetaTypes<Server> = {
  records,
  columns,
  fetching,
  idAccessor: "id",
  selectable: true,
};

<BaseTable<Server> tableMeta={tableMeta} />
```

Selected records are managed internally by `BaseTable`. If you need access to the selection, lift state up by controlling it outside the component — or extend `TableMetaTypes` with a `selectedRecords` / `onSelectedRecordsChange` pair in your own wrapper.

## With row click handler

```tsx
const tableMeta: TableMetaTypes<Server> = {
  records,
  columns,
  fetching,
  idAccessor: "id",
  onRowClick: (server) => navigate(`/servers/${server.id}`),
};
```
