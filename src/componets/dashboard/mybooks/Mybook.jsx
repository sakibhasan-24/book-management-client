import { Table } from "flowbite-react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Mybook({ book, isAdmin }) {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {book.title}
      </Table.Cell>

      <Table.Cell>{book.category}</Table.Cell>
      <Table.Cell>
        <img
          src={book.imagesUrls[0]}
          alt="img"
          className="w-12 h-12 rounded-full object-contain cursor-pointer"
        />
      </Table.Cell>
      <Table.Cell>
        <p>{book.price} BDT</p>
      </Table.Cell>
      {!isAdmin && (
        <Table.Cell>
          <p
            className="font-medium text-green-600 hover:underline  cursor-pointer"
            //   onClick={() => handleDeletebook(book._id)}
          >
            <FaEdit />
          </p>
        </Table.Cell>
      )}
      <Table.Cell>
        <p
          className="font-medium text-red-600 hover:underline  cursor-pointer"
          //   onClick={() => handleDeletebook(book._id)}
        >
          <FaTrash />
        </p>
      </Table.Cell>
    </Table.Row>
  );
}
