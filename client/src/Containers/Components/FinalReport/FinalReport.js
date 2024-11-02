import React from "react";
import "./FinalReport.css";
import StickyHeadTable from "../../Reusables/StickyHeadTable/StickyHeadTable";
import { useGetModeration } from "../../../Query/Hooks/useGetModeration";
import CircularProgress from "@mui/material/CircularProgress";

export const FinalReport = () => {
  const { data, isPending, isError } = useGetModeration();
  if (isPending) {
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
      if (key === "semester" || key === "batch") {
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

  columns.push({
    id: "finalReport",
    label: "Final Report",
    minWidth: "fit-content",
  });

  let rows = data.data
    .filter((item) => item.final_report_generated === "Yes")
    .map((item, index) => {
      const { batch, semester } = item;
      return {
        "S.No": index + 1,
        batch,
        semester,
        finalReport: `${batch}-${semester}.xlsx`,
      };
    });

  return (
    <div className="finalReportDetails">
      <StickyHeadTable columns={columns} rows={rows} minHeight={400} />
    </div>
  );
};
