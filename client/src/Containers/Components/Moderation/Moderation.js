import React from "react";
import "./Moderation.css";
import StickyHeadTable from "../../Reusables/StickyHeadTable/StickyHeadTable";
import { useGetModeration } from "../../../Query/Hooks/useGetModeration";
import CircularProgress from "@mui/material/CircularProgress";

export const Moderation = () => {
  const { data, isLoading, error, isError } = useGetModeration();

  if (isLoading) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return <div>Error loading moderation data.</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No moderation data available.</div>;
  }

  let columns = Object.keys(data.data[0])
    .filter((key) => key !== "_id")
    .map((key) => {
      if (
        key === "semester" ||
        key === "batch" ||
        key === "no_of_moderation" ||
        key === "status"
      ) {
        return {
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          minWidth: "fit-content",
        };
      }
      return null;
    })
    .filter(Boolean);

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
    <div className="moderationDetails">
      <StickyHeadTable columns={columns} rows={rows} minHeight={400} />
    </div>
  );
};
