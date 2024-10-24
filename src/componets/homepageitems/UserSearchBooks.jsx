import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function UserSearchBooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      const storedSearchData = JSON.parse(localStorage.getItem("searchData"));
      if (storedSearchData && storedSearchData.searchTerm) {
        setSearchTerm(storedSearchData.searchTerm);
      }
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();

    const storedSearchData = JSON.parse(localStorage.getItem("searchData"));

    const searchTermData =
      searchTerm || (storedSearchData && storedSearchData.searchTerm) || "";

    const category =
      storedSearchData && storedSearchData.category
        ? storedSearchData.category
        : "";
    if (!searchTermData && !category) {
      navigate("/search");
      return;
    }
    const searchUrl = `/search?searchTerm=${searchTermData}&category=${category}`;
    localStorage.setItem(
      "searchData",
      JSON.stringify({ searchTerm: searchTermData, category })
    );
    navigate(searchUrl);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between gap-2 w-full max-w-md mx-auto p-2 border-2 border-gray-300 rounded-lg bg-white shadow-md"
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search books..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 bg-transparent border-none text-gray-800 placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out"
      >
        <FaSearch />
      </button>
    </form>
  );
}
