import "./Student.css";
import StickyHeadTable from "../../Reusables/StickyHeadTable/StickyHeadTable";
import { Link } from "react-router-dom";

const columns = [
  { id: "S.No", label: "S.No", minWidth: 170 },
  { id: "Semester", label: "Semester", minWidth: 170 },
  { id: "Domain", label: "Domain", minWidth: 170 },
  { id: "Guide ID", label: "Guide ID", minWidth: 170 },
  { id: "Project name", label: "Project name", minWidth: 250 },
  { id: "Marks obtained", label: "Marks obtained", minWidth: 170 },
];

const rows = [
  {
    "S.No": "1",
    Semester: "7",
    Domain: "Cloud",
    "Guide ID": "107",
    "Project name": "Attendence tracking system using cloud computing",
    "Marks obtained": "96",
  },
  {
    "S.No": "2",
    Semester: "7",
    Domain: "Image Processing",
    "Guide ID": "107",
    "Project name": "Attendence tracking system using cloud computing",
    "Marks obtained": "96",
  },
];

export const Student = () => {
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
