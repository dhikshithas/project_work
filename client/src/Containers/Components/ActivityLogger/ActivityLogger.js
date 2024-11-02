import React from "react";
import "./ActivityLogger.css";
import StickyHeadTable from "../../Reusables/StickyHeadTable/StickyHeadTable.js";
import { useGetModeration } from "../../../Query/Hooks/useGetModeration.js";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  { id: "S.No", label: "S.No", minWidth: 170 },
  { id: "Semester", label: "Semester", minWidth: 170 },
  { id: "Guide mark", label: "Guide mark", minWidth: 170 },
  { id: "PMC mark", label: "PMC mark", minWidth: 170 },
  { id: "Date", label: "Date", minWidth: 170 },
  { id: "Uploaded mark", label: "Uploaded mark", minWidth: 170 },
  {
    id: "Uploaded project detail",
    label: "Uploaded project detail",
    minWidth: 170,
  },
  { id: "Excel accepted", label: "Excel accepted", minWidth: 170 },
  {
    id: "No. of modifications required",
    label: "No. of modifications required",
    minWidth: 170,
  },
  { id: "Moderation status", label: "Moderation status", minWidth: 170 },
  {
    id: "Final report generated",
    label: "Final report generated",
    minWidth: 170,
  },
];

const rows = [
  {
    "S.No": 1,
    Semester: 7,
    "Guide mark": 25,
    "PMC mark": 75,
    Date: "12/03/24",
    "Uploaded mark": "2024_s7_marks.xlsx",
    "Uploaded project detail": "2024_s7_details.xlsx",
    "Excel accepted": "Yes",
    "No. of modifications required": "29",
    "Moderation status": "Pending",
    "Final report generated": " ",
  },
  {
    "S.No": 1,
    Semester: 7,
    "Guide mark": 25,
    "PMC mark": 75,
    Date: "12/03/24",
    "Uploaded mark": "2024_s7_marks.xlsx",
    "Uploaded project detail": "2024_s7_details.xlsx",
    "Excel accepted": "Yes",
    "No. of modifications required": "29",
    "Moderation status": "Completed",
    "Final report generated": "Yes",
  },
];

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
