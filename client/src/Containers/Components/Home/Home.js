import React from "react";
import "./Home.css";
import sem7logo from "../../../assets/images/sem7Logo.png";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homeContent" onClick={() => navigate("/admin/formEntry")}>
      <div>Hello ADMIN,</div>
      <div className="sem7">
        <img src={sem7logo} alt="sem7" />
        <div className="semName">Semester 7</div>
      </div>
    </div>
  );
};
