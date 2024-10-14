import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componets/header/navbar/Navbar";
import Footer from "../componets/footer/Footer";

export default function MainLayout() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
