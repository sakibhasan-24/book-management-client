import React, { useEffect, useState } from "react";
import { Alert } from "flowbite-react";
import useGetBooks from "../../hooks/books/useGetBooks";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // New arrow icons

export default function AllBooks() {
  const { books, loading, error, getAllType, totalBooks, getAllBooks } =
    useGetBooks();
  const { currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(3);

  const totalPage = Math.ceil(totalBooks / numberOfItemsPerPage);
  const pageList = [...Array(totalPage).keys()];

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleCurrentPageChange = (e) => {
    setNumberOfItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      await getAllType({}, currentPage, numberOfItemsPerPage);
    };
    fetchBooks();
  }, [currentPage, numberOfItemsPerPage]);

  return (
    <div className="container mx-auto p-4">
      {error && <Alert color="failure">{error}</Alert>}

      <h1 className="text-3xl font-bold text-center mb-8"> Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          disabled={currentPage === 0}
          onClick={() => handleCurrentPage(currentPage - 1)}
          className={`p-2 rounded-lg ${
            currentPage === 0 ? "bg-gray-300" : "bg-blue-500"
          } text-white`}
        >
          <FaChevronLeft />
        </button>

        {pageList.map((btn) => (
          <button
            key={btn}
            onClick={() => handleCurrentPage(btn)}
            className={`p-2 w-10 h-10 rounded-full text-white ${
              currentPage === btn ? "bg-blue-700" : "bg-blue-500"
            }`}
          >
            {btn + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPage - 1}
          onClick={() => handleCurrentPage(currentPage + 1)}
          className={`p-2 rounded-lg ${
            currentPage === totalPage - 1 ? "bg-gray-300" : "bg-blue-500"
          } text-white`}
        >
          <FaChevronRight />
        </button>

        <select
          value={numberOfItemsPerPage}
          onChange={handleCurrentPageChange}
          className="ml-4 p-2 border border-gray-300 rounded-lg"
        >
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
          <option value={totalBooks}>All</option>
        </select>
      </div>
    </div>
  );
}
