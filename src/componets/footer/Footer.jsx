import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-slate-700 p-8 w-full">
      <footer className="footer flex flex-wrap justify-between items-center bg-neutral text-neutral-content p-10">
        <div className="flex items-center">
          <GiBookshelf className="text-6xl text-blue-400" />
          <div className="ml-4 text-white">
            <h2 className="text-2xl font-bold">Swap Books</h2>
            <p className="text-sm">
              Bringing readers together, one swap at a time.
            </p>
            <p className="text-xs">Providing reliable services since 2024</p>
          </div>
        </div>

        <div className="flex flex-col text-center">
          <h6 className="text-lg text-white font-semibold mb-2">Follow Us</h6>
          <div className="flex gap-4 justify-center">
            <p
              className="text-blue-500 hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={30} />
            </p>
            <p
              className="text-blue-400 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={30} />
            </p>
            <p
              className="text-red-500 hover:text-red-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={30} />
            </p>
          </div>
        </div>
      </footer>
      <div className="text-center text-white p-4">
        &copy; {currentYear}{" "}
        <a target="_blank" href="https://book-management-57c93.web.app/">
          <span className="text-blue-600 underline font-bold text-2xl">
            Book Exchange
          </span>
        </a>{" "}
        All rights reserved.
      </div>
    </div>
  );
}
