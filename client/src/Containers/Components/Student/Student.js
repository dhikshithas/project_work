import "./Student.css";
import StickyHeadTable from "../../Reusables/StickyHeadTable/StickyHeadTable";
import { Link } from "react-router-dom";
import { useGetStudentDetails } from "../../../Query/Hooks/useGetStudentDetails";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export const Student = () => {
  const { roll_no } = useParams();
  console.log(roll_no);
  const { data, isLoading, isError } = useGetStudentDetails(roll_no);

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
        key === "semester" ||
        key === "dept_name" ||
        key === "guide_id" ||
        key === "project_name" ||
        key === "total"
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
    <div className="studentMain">
      <div className="studentHeader">
        <div className="dashboard">Dashboard</div>
        <div className="logout">
          <Link className="navbutton" to="/">
            Logout
          </Link>
        </div>
      </div>
      <div className="studentMainContent">
        <div className="studentInfo">
          <div className="studentName">
            <div className="studentPic"></div>
            <div className="studentDetails">
              <div className="name">DHIKSHITHA S</div>
              <div className="roll">7376221CS146</div>
              <div className="dept">COMPUTER SCIENCE AND ENGINEERING</div>
            </div>
          </div>
          <div className="studentGraph"></div>
        </div>
        <StickyHeadTable columns={columns} rows={rows} minHeight={200} />
      </div>
    </div>
  );
};
