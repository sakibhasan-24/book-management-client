import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const location = useLocation();
  const handleRoute = (route) => {
    if (location.pathname === route) {
      return true;
    }
    return false;
  };
  //   const [isOpen, setIsOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="max-w-8xl mx-auto p-4 bg-slate-100 ">
      {/* for desktop */}
      <div className="flex flex-row items-center justify-between gap-8 ">
        <div>
          <Link to="" className="text-2xl font-semibold text-slate-600">
            Book
            <span className="text-blue-500 text-3xl font-bold">
              Exchange
            </span>{" "}
          </Link>
        </div>
        <div className="hidden sm:flex items-center justify-center gap-4 mr-12 text-md font-bold text-slate-600">
          <Link
            to="/add-books"
            className={`${handleRoute("/add-books") && "underline "}`}
          >
            Add Books
          </Link>

          <Link
            to="/user-credentials/login"
            className={`
             ${handleRoute("/user-credentials/login") && "underline "}
            `}
          >
            Login
          </Link>
        </div>
        {/* start of mobile view */}
        <div
          className={`flex  justify-between sm:hidden bg-slate-300 rounded-full p-2 `}
        >
          <MobileNav
            className={`transform  transition-transform duration-700 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        {/* end of mobile view */}
      </div>
      {/* end of desktop */}
    </div>
  );
}