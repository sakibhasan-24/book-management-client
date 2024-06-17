import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componets/header/navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
