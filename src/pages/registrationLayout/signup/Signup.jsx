import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full sm:max-w-xl md:max-w-2xl mx-auto ">
      <h1 className="text-xl text-center font-semibold text-slate-500 mb-2">
        Please Signup
      </h1>
      <div className="w-full">
        <form className="flex items-center flex-col gap-4">
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
          />
          <input
            type="email"
            name="userEmail"
            placeholder="User Email"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
          />

          <input
            type={`${showPassword ? "text" : "password"}`}
            name="userPassword"
            placeholder="****************"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
          />
          {showPassword ? (
            <FaEye
              onClick={handleShowPassword}
              className="relative  -top-[52px] -right-32 sm:-right-56  text-xl text-slate-500 cursor-pointer hover:text-slate-800"
            />
          ) : (
            <FaEyeSlash
              onClick={handleShowPassword}
              className="relative  -top-[52px] -right-32 sm:-right-56  text-xl text-slate-500 cursor-pointer hover:text-slate-800"
            />
          )}

          <input
            type="file"
            name="image"
            id="image"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
          />
          <input
            type="submit"
            value="Signup"
            className="w-full font-bold p-2 rounded-md bg-slate-800 cursor-pointer hover:bg-slate-600 text-white"
          />
        </form>
        <p className="text-center text-slate-500 mt-2">
          Already have an account?
          <span className="text-slate-800 font-semibold">
            <Link
              to="/user-credentials/login"
              className="text-slate-800 font-semibold"
            >
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
