import React from "react";
import "./home.css";
import sem7logo from "./sem7logo.png";
import { useNavigate } from "react-router-dom";
export const Home=()=>{
    const navigate =useNavigate();

    return  <div className="homecontent" onClick={()=>navigate("/admin/formEntry")}>
            <div>Hello ADMIN,</div>
            <div className="sem7">
                <img src={sem7logo} alt="sem7"/>
                <div className="semname">Semester 7</div>
            </div>
        </div>
};