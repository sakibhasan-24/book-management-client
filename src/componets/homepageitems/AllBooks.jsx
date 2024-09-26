import React, { useEffect, useState } from "react";
import { Spinner, Alert } from "flowbite-react";
import useGetBooks from "../../hooks/books/useGetBooks";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function AllBooks() {
  const { books, loading, error, getAllType } = useGetBooks();
  const { currentUser } = useSelector((state) => state.user);

  const [searchParams, setSearchParams] = useState(() => {
    const storedParams = localStorage.getItem("searchParams");
    return storedParams ? JSON.parse(storedParams) : {};
  });

  useEffect(() => {
    getAllType(searchParams);
    localStorage.setItem("searchParams", JSON.stringify(searchParams));
  }, [searchParams]);

  const handleSearch = (e) => {
    setSearchParams({ ...searchParams, searchTerm: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setSearchParams({ ...searchParams, category: e.target.value });
  };

  const clearSearches = () => {
    setSearchParams({});
    localStorage.removeItem("searchParams");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-center mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search books..."
            value={searchParams.searchTerm || ""}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-500 pointer-events-none" />
        </div>
        <select
          value={searchParams.category || ""}
          onChange={handleCategoryChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          <option value="">All Categories</option>
          <option value="Cse">Computer Science</option>
          <option value="Math">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="English">English</option>
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
          <option value="History">History</option>
          <option value="Geography">Geography</option>
          <option value="Political Science">Political Science</option>
          <option value="Economics">Economics</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Psychology">Psychology</option>
          <option value="Sociology">Sociology</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Dance">Dance</option>
          <option value="Drama">Drama</option>
          <option value="Fine Arts">Fine Arts</option>
          <option value="Architecture">Architecture</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Electronics and Communication Engineering">
            Electronics and Communication Engineering
          </option>
        </select>
        <button
          onClick={clearSearches}
          className="p-3 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition duration-300"
        >
          Clear Searches
        </button>
      </div>
      {loading && (
        <div className="flex justify-center">
          <Spinner size="xl" />
        </div>
      )}
      {books.length === 0 && (
        <div className="flex justify-center flex-col items-center text-center">
          <p className="text-2xl font-bold">No books found.</p>
          {currentUser && currentUser.user.isAdmin === false && (
            <Link
              to="/dashboard/add-books"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              You can Add a Book
            </Link>
          )}
          {currentUser && currentUser.user.isAdmin && (
            <Link
              to="/dashboard/add-books"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add a Book
            </Link>
          )}
        </div>
      )}
      {error && <Alert color="failure">{error}</Alert>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
