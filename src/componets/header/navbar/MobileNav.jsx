import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

export default function MobileNav({ isSidebarOpen, toggleSidebar }) {
  return (
    <div>
      {/* icon */}
      <div>
        {isSidebarOpen ? (
          <ImCross
            onClick={toggleSidebar}
            className="text-2xl text-slate-700 font-semibold cursor-pointer"
          />
        ) : (
          <CiMenuFries
            onClick={toggleSidebar}
            className="text-2xl font-semibold cursor-pointer"
          />
        )}
      </div>
      {/* content */}

      {isSidebarOpen && (
        <div
          className={`w-1/2 min-h-screen fixed top-14 right-1 rounded-lg bg-slate-100 flex flex-col justify-center items-center gap-4 text-md font-bold text-slate-600  `}
        >
          <Link to="/add-books" onClick={toggleSidebar}>
            Add Books
          </Link>
          <Link to="/two" onClick={toggleSidebar}>
            Two
          </Link>
          <Link to="/user-credentials/login" onClick={toggleSidebar}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
