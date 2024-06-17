import React from "react";
import { Link, Outlet } from "react-router-dom";
import activeRoute from "../../helper/activeRoute";
export default function RegistrationLayout() {
  const activeRouter = activeRoute();
  return (
    <div className="w-full p-2 mx-2 sm:max-w-xl md:max-w-xl sm:mx-auto my-12 flex flex-col items-center justify-center gap-6 shadow-lg shadow-purple-200 sm:p-4 rounded-lg bg-slate-100">
      <div className="flex items-center justify-center gap-6 font-semibold text-xl text-orange-800">
        <Link
          to="/user-credentials/signup"
          className={`${
            activeRouter("/user-credentials/signup")
              ? "shadow-lg shadow-slate-900 text-slate-800 px-4 py-2 rounded-lg bg-slate-200"
              : ""
          }`}
        >
          Sign Up
        </Link>
        <Link
          className={`${
            activeRouter("/user-credentials/login")
              ? "shadow-lg shadow-slate-900 text-slate-800 px-4 py-2 rounded-lg bg-slate-200"
              : ""
          }`}
          to="/user-credentials/login"
        >
          Login
        </Link>
      </div>
      <div className="w-full sm:max-w-xl md:max-w-xl">
        <Outlet />
      </div>
    </div>
  );
}
