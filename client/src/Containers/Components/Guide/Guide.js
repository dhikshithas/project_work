import "./Guide.css";
import { MaterialTable } from "../../Reusables/MaterialTable/MaterialTable";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetGuideDetails } from "../../../Query/Hooks/useGetGuideDetails";

export const Guide = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetGuideDetails(id);

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
        key === "roll_no" ||
        key === "std_name" ||
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
    <div className="guideMain">
      <div className="guideHeader">
        <div className="dashboard">Dashboard</div>
        <div className="logout">
          <Link className="navbutton" to="/">
            Logout
          </Link>
        </div>
      </div>
      <div className="guideMainContent">
        <div className="guideInfo">
          <div className="guideName">PRAVIN SAVARIDASS</div>
          <div className="guideID">{id}</div>
        </div>
        <MaterialTable columns={columns} rows={rows} />
      </div>
    </div>
  );
};
