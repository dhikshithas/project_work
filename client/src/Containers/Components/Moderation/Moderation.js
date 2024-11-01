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
    return <div>Error loading moderation data.</div>; // Display an error message
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No moderation data available.</div>;
  }

  let columns = Object.keys(data.data[0])
    .map((key) => {
      return {
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        minWidth: "fit-content",
      };
    })
    .filter(Boolean);

  let rows = data.data;

  return (
    <div className="moderationDetails">
      <StickyHeadTable columns={columns} rows={rows} minHeight={400} />
    </div>
  );
};
