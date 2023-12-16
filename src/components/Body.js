import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <div className="flex">
      <div className=" w-3/20">
        <Sidebar />
      </div>
      <div className="w-17/20">
        
        <Outlet />
      </div>
    </div>
  );
};
export default Body;
