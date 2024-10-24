import { Table } from "flowbite-react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Mybook({ book, isAdmin, handleDeleteBook }) {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      {/* Book Title */}
      <Table.Cell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
        {book.title}
      </Table.Cell>

      {/* Category */}
      <Table.Cell className="text-gray-600 dark:text-gray-300">
        {book.category}
      </Table.Cell>

      {/* Book Image */}
      <Table.Cell className="text-center">
        <Link to={`/book/${book._id}`}>
          <img
            src={book.imagesUrls[0]}
            alt="Book"
            className="w-12 h-12 rounded-full object-cover shadow-md hover:scale-105 transition-transform"
          />
        </Link>
      </Table.Cell>

      {/* Price */}
      <Table.Cell className="text-gray-700 dark:text-gray-300">
        {book.price} BDT
      </Table.Cell>

      {/* Number of times rented */}
      <Table.Cell className="text-gray-700 dark:text-gray-300">
        {book.numberOfTimesRent || 0}
      </Table.Cell>

      {/* Book Status (Accepted/Not Accepted) */}
      <Table.Cell
        className={book.isAccepted ? "text-green-600" : "text-red-600"}
      >
        {book.isAccepted ? "Accepted" : "Not Accepted"}
      </Table.Cell>

      {/* Action Buttons */}
      {isAdmin ? (
        // Admin actions
        <>
          {book.isAccepted ? (
            <>
              {/* Edit Button */}
              <Table.Cell className="text-center">
                <Link to={`/dashboard/update-book/${book._id}`}>
                  <FaEdit className="text-green-600 cursor-pointer hover:text-green-800 transition-colors" />
                </Link>
              </Table.Cell>
              {/* Delete Button */}
              <Table.Cell
                className="text-center"
                onClick={() => handleDeleteBook(book._id)}
              >
                <FaTrash className="text-red-600 cursor-pointer hover:text-red-800 transition-colors" />
              </Table.Cell>
            </>
          ) : (
            <>
              {/* Not Accepted Message */}
              <Table.Cell className="text-yellow-500">
                Not Accepted Yet
              </Table.Cell>
              {/* Delete Button */}
              <Table.Cell
                className="text-center"
                onClick={() => handleDeleteBook(book._id)}
              >
                <FaTrash className="text-red-600 cursor-pointer hover:text-red-800 transition-colors" />
              </Table.Cell>
            </>
          )}
        </>
      ) : (
        // User actions
        <>
          {book.isAccepted ? (
            <Table.Cell className="text-center">
              <Link
                to="/dashboard/user"
                className="text-blue-500 hover:underline"
              >
                Check
              </Link>
            </Table.Cell>
          ) : (
            <>
              {/* Edit Button */}
              <Table.Cell className="text-center">
                <Link to={`/dashboard/update-book/${book._id}`}>
                  <FaEdit className="text-green-600 cursor-pointer hover:text-green-800 transition-colors" />
                </Link>
              </Table.Cell>
              {/* Delete Button */}
              <Table.Cell
                className="text-center"
                onClick={() => handleDeleteBook(book._id)}
              >
                <FaTrash className="text-red-600 cursor-pointer hover:text-red-800 transition-colors" />
              </Table.Cell>
            </>
          )}
        </>
      )}
    </Table.Row>
  );
}
