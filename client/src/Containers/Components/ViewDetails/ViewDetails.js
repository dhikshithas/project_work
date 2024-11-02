import { MaterialTable } from "../../Reusables/MaterialTable/MaterialTable";
import "./ViewDetails.css";
import { useGetStudentMarks } from "../../../Query/Hooks/useGetStudentMarks";
import CircularProgress from "@mui/material/CircularProgress";

export const ViewDetails = () => {
  const { data, isLoading, isError } = useGetStudentMarks();

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
      if (
        key === "std_name" ||
        key === "roll_no" ||
        key === "guide_id" ||
        key === "semester" ||
        key === "project_name" ||
        key === "total"
      ) {
        return {
          accessorKey: key,
          header: key,
          size: "fit-content",
          enableEditing: false,
        };
      }
      return null;
    })
    .filter(Boolean);

  columns.unshift({
    accessorKey: "id",
    header: "id",
    size: "fit-content",
    enableEditing: false,
  });

  let rows = data.data.map((item, index) => {
    const { _id, ...rest } = item;
    return {
      id: index + 1,
      ...rest,
    };
  });

  return (
    <div className="viewDetails">
      <MaterialTable columns={columns} rows={rows} key={columns} />
    </div>
  );
};
