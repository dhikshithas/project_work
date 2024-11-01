import "./Layout.css";
import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="layoutContainer">
      <div className="header">
        <div>Project Work Portal</div>
        <div>
          <Link className="navButton" to="/">
            Logout
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="navButton" to="/admin">
            Dashboard
          </Link>
          <Link className="navButton" to="/admin/activityLogger">
            Activity Logger
          </Link>
          <Link className="navButton" to="/admin/moderation">
            Moderation
          </Link>
          <Link className="navButton" to="/admin/viewDetails">
            View Details
          </Link>
          <Link className="navButton" to="/admin/finalReport">
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
