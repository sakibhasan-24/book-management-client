import React from "react";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full sm:max-w-2xl my-24 mx-auto flex flex-col gap-6 items-center justify-center">
      <div>
        <FaRegFaceSadCry className="text-9xl ml-8 text-red-900" />
        <p className="text-center font-bold text-slate-600 text-9xl ">404</p>
        <p className="text-center font-bold text-slate-600 text-md">
          Page is not found
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Link
          to="/"
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          GO HOME
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="bg-amber-900 hover:bg-amber -700 text-white font-bold py-2 px-4 rounded"
        >
          GO BACK
        </button>
      </div>
    </div>
  );
}
