import { MaterialTable } from "../../Reusables/MaterialTable/MaterialTable";
import "./ViewDetails.css";

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

export const ViewDetails = () => {
  return (
    <div className="viewDetails">
      <MaterialTable columns={columns} rows={rows} />
    </div>
  );
};
