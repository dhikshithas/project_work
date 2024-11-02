import React from "react";
import "./ActivityLogger.css";
import StickyHeadTable from "../../Reusables/StickyHeadTable/StickyHeadTable.js";
import { useGetModeration } from "../../../Query/Hooks/useGetModeration.js";
import CircularProgress from "@mui/material/CircularProgress";

export const ActivityLogger = () => {
  const { data, isLoading, isError } = useGetModeration();

  if (isLoading) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading student data.</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No data available.</div>;
  }

  let columns = Object.keys(data.data[0])
    .filter((key) => key !== "_id")
    .map((key) => {
      return {
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        minWidth: "fit-content",
      };
    });

  columns.unshift({
    id: "S.No",
    label: "S.No",
    minWidth: "fit-content",
  });

  let rows = data.data.map((item, index) => {
    const { _id, ...rest } = item;
    return {
      "S.No": index + 1,
      ...rest,
    };
  });

  return (
    <div className="loggerContent">
      <StickyHeadTable columns={columns} rows={rows} minHeight={400} />
    </div>
  );
};
