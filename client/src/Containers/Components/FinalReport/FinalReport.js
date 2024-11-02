import React from "react";
import "./FinalReport.css";
import StickyHeadTable from "../../Reusables/StickyHeadTable/StickyHeadTable";
import { useGetBatchMark } from "../../../Query/Hooks/useGetBatchDetails";
const columns = [
  { id: "S.No", label: "S.No", minWidth: 170 },
  { id: "Semester", label: "Semester", minWidth: 170 },
  { id: "Batch", label: "Batch", minWidth: 170 },
  { id: "Final Report", label: "Final Report", minWidth: 170 },
  { id: "View Analysis", label: "View Analysis", minWidth: 170 },
];

const rows = [
  {
    "S.No": 1,
    Semester: 7,
    Batch: 2020 - 24,
    "Final Report": "",
    "View Analysis": "",
  },
  {
    "S.No": 1,
    Semester: 7,
    Batch: 2020 - 24,
    "Final Report": "",
    "View Analysis": "",
  },
];

export const FinalReport = () => {
  return (
    <div className="finalReportDetails">
      <StickyHeadTable columns={columns} rows={rows} minHeight={400} />
    </div>
  );
};
