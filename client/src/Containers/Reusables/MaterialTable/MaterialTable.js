import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export const MaterialTable = ({ columns, rows }) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedRows = useMemo(() => rows, [rows]);

  const table = useMaterialReactTable({
    columns: memoizedColumns,
    data: memoizedRows,
    enableStickyHeader: true,
    editDisplayMode: "cell",
    enableEditing: true,
    memoMode: "cells",
    muiTablePaperProps: {
      sx: {
        width: "100%",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};
