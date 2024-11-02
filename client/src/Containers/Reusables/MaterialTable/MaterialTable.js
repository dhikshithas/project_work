import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export const MaterialTable = ({ columns, rows }) => {
  console.log("1", columns, rows);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedRows = useMemo(() => rows, [rows]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, //customize the default page size
  });
  const table = useMaterialReactTable({
    columns: memoizedColumns,
    data: memoizedRows,
    enableStickyHeader: true,
    editDisplayMode: "cell",
    enableEditing: true,
    enableStickyFooter: true,
    memoMode: "cells",
    muiTablePaperProps: {
      sx: {
        width: "100%",
        maxHeight: "530px",
      },
    },
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: { pagination },
  });

  return <MaterialReactTable table={table} key={columns} />;
};
