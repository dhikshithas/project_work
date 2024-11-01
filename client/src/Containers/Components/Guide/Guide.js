import "./Guide.css";
import { MaterialTable } from "../../Reusables/MaterialTable/MaterialTable";
import { Link } from "react-router-dom";

const columns = [
  { accessorKey: "id", header: "S.no", size: 170, enableEditing: false },
  { accessorKey: "Name", header: "Name", size: 170, enableEditing: false },
  {
    accessorKey: "Roll number",
    header: "Roll number",
    size: 170,
    enableEditing: false,
  },
  {
    accessorKey: "Guide ID",
    header: "Guide ID",
    size: 170,
    enableEditing: false,
  },
  {
    accessorKey: "Semester",
    header: "Semester",
    size: 170,
    enableEditing: false,
  },
  {
    accessorKey: "Project name",
    header: "Project name",
    size: 170,
    enableEditing: false,
  },
  {
    accessorKey: "Marks obtained",
    header: "Marks obtained",
    size: 170,
    enableEditing: false,
  },
];

const rows = [
  {
    id: "1",
    Name: "Baskar T",
    "Roll number": "7376201CS114",
    "Guide ID": "107",
    Semester: "7",
    "Project name": "Attendence tracking system using cloud computing",
    "Marks obtained": "96",
  },
  {
    id: "2",
    Name: "Renu",
    "Roll number": "7376221CS114",
    "Guide ID": "107",
    Semester: "7",
    "Project name": "Smart E-Banking transactions",
    "Marks obtained": "96",
  },
];

export const Guide = () => {
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
          <div className="guideID">101</div>
        </div>
        <MaterialTable columns={columns} rows={rows} />
      </div>
    </div>
  );
};
