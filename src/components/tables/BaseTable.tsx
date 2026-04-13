"use client";

import classes from "./BaseTable.module.css";
import { useState } from "react";
import { DataTable, type DataTableColumn } from "mantine-datatable";

export interface PaginationMeta {
  page: number;
  totalRecords: number;
  recordsPerPage: number;
  recordsPerPageOptions: number[];
  onRecordsPerPageChange: (numPage: number) => void;
  onPageChange: (page: number) => void;
}

export interface TableMetaTypes<T> {
  records: T[];
  columns: DataTableColumn<T>[];
  fetching: boolean;
  idAccessor?: string | undefined;
  pagination?: PaginationMeta;
  selectable?: boolean;
  pinLastColumn?: boolean;
  onRowClick?: (record: T) => void;
}

export type { DataTableColumn };

// export interface TableHeaderTypes {
//   headerName?: string;
//   withAddButton?: boolean;
//   searchInput: string;
//   onSearchChange: (input: string) => void;
//   onHeaderBtnClick: () => void;
//   buttons?: ButtonProp[];
// }

interface DefaultTableProps<T> {
  tableMeta: TableMetaTypes<T>;
  // tableHeader: TableHeaderTypes;
}

const THEADER_HEIGHT = 33.59;
const TBODY_ROW_HEIGHT = 55;
const TABLE_HEIGHT = THEADER_HEIGHT + TBODY_ROW_HEIGHT * 10;

export function BaseTable<T>({
  tableMeta: {
    records,
    columns,
    fetching,
    idAccessor = undefined,
    pagination,
    selectable = false,
    pinLastColumn = false,
    onRowClick,
  },
}: DefaultTableProps<T>) {
  const [selectedRecords, setSelectedRecords] = useState<T[]>([]);

  const paginationProps = pagination
    ? { ...pagination, recordsPerPageLabel: "Records per page" }
    : {};

  const selectionProps = selectable
    ? {
        selectedRecords,
        onSelectedRecordsChange: setSelectedRecords,
        selectionCheckboxProps: { radius: "md" },
      }
    : {};

  return (
    <DataTable
      // Default Props
      highlightOnHover
      withTableBorder
      minHeight={records.length > 0 ? undefined : 150}
      height={!pagination && records.length >= 10 ? TABLE_HEIGHT : undefined}
      idAccessor={idAccessor}
      records={records}
      columns={columns}
      fetching={fetching}
      classNames={classes}
      pinLastColumn={pinLastColumn}
      onRowClick={onRowClick ? ({ record }) => onRowClick(record) : undefined}
      // Pagination
      {...paginationProps}
      // Selection
      {...selectionProps}
    />
  );
}
