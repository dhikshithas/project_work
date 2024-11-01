import "./Layout.css";
import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="layoutContainer">
      <div className="header">
        <div>Project Work Portal</div>
        <div>
          <Link className="navbutton" to="/">
            Logout
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="navbutton" to="/admin">
            Dashboard
          </Link>
          <Link className="navbutton" to="/admin/activityLogger">
            Activity Logger
          </Link>
          <Link className="navbutton" to="/admin/moderation">
            Moderation
          </Link>
          <Link className="navbutton" to="/admin/viewDetails">
            View Details
          </Link>
          <Link className="navbutton" to="/admin/finalReport">
            Final Report
          </Link>
        </div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
