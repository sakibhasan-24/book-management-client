import { Table, TableCell } from "flowbite-react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Mybook({ book, isAdmin, handleDeleteBook }) {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {book.title}
      </Table.Cell>

      <Table.Cell>{book.category}</Table.Cell>
      <Link to={`/book/${book._id}`}>
        <Table.Cell>
          <img
            src={book.imagesUrls[0]}
            alt="img"
            className="w-12 h-12 rounded-full object-contain cursor-pointer"
          />
        </Table.Cell>
      </Link>
      <Table.Cell>
        <p>{book.price} BDT</p>
      </Table.Cell>

      {!isAdmin && book?.isAccepted ? (
        <Table.Cell>Accepted</Table.Cell>
      ) : (
        isAdmin === false && (
          <Link to={`/dashboard/update-book/${book._id}`}>
            <Table.Cell>
              <p className="font-medium text-green-600 hover:underline  cursor-pointer">
                <FaEdit />
              </p>
            </Table.Cell>
          </Link>
        )
      )}
      {isAdmin && book?.isAccepted === false ? (
        <Table.Cell>Not Accepted Yet</Table.Cell>
      ) : (
        <Link to={`/dashboard/update-book/${book._id}`}>
          <Table.Cell>
            <p className="font-medium text-green-600 hover:underline  cursor-pointer">
              <FaEdit />
            </p>
          </Table.Cell>
        </Link>
      )}

      {book?.isAccepted && !isAdmin ? (
        <Table.Cell>
          <Link
            className="text-xl font-semibold text-blue-500 underline"
            to="/dashboard/user"
          >
            Check
          </Link>
        </Table.Cell>
      ) : (
        <Table.Cell onClick={() => handleDeleteBook(book._id)}>
          <p
            className="font-medium text-red-600 hover:underline  cursor-pointer"
            onClick={() => handleDeleteBook(book._id)}
          >
            <FaTrash />
          </p>
        </Table.Cell>
      )}
    </Table.Row>
  );
}
