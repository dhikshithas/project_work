import "./ModerationMark.css";
import { MaterialTable } from "../../Reusables/MaterialTable/MaterialTable.js";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useGetModerationMark } from "../../../Query/Hooks/useGetModerationMark.js";
import CircularProgress from "@mui/material/CircularProgress";

// const rows = [
//   {
//     Name: "ash",
//   },
// ];

// const columns = [
//   {
//     accessorkey: "Name",
//     header: "Name",
//     size: "fit-content",
//     enableEditing: false,
//   },
// ];

const columns = [
  { accessorKey: "Name", header: "Name", size: 170, enableEditing: false },
];

const rows = [
  {
    Name: "Baskar T",
  },
];

export const ModerationMark = () => {
  const location = useLocation();
  const { batch } = location.state || {};
  console.log(batch);
  const { data, isLoading, isError, error } = useGetModerationMark({ batch });

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
  console.log("data", data.data);

  let columns = Object.keys(data.data[0])
    .filter((key) => key === "std_name" || key === "batch") // Eliminate the _id key
    .map((key) => {
      return {
        accessorKey: key,
        header: key,
        size: 170,
        enableEditing: false,
      };
    });

  columns.unshift({
    accessorKey: "id",
    header: "id",
    size: 170,
    enableEditing: false,
  });

  console.log("header", columns);

  let rows = data.data.map((item, index) => {
    const { _id, ...rest } = item;
    return {
      id: index + 1,
      ...rest,
    };
  });

  return (
    <div className="moderationForm">
      <MaterialTable columns={columns} rows={rows} />
      <Button variant="contained" className="submit">
        Submit
      </Button>
    </div>
  );
};
