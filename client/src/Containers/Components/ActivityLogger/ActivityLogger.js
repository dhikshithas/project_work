import React from "react";
import "./ActivityLogger.css";
import StickyHeadTable from "../../Reusables/StickyHeadTable/StickyHeadTable.js";

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
  return (
    <div className="loggerContent">
      <StickyHeadTable columns={columns} rows={rows} minHeight={400} />
    </div>
  );
};
