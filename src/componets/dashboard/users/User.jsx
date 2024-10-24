import { Table } from "flowbite-react";
import React from "react";
import { FaTrash } from "react-icons/fa";

export default function User({ user, handleDeleteUser }) {
  //   console.log(user);
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {user.userName}
      </Table.Cell>
      <Table.Cell>
        {/* {user.isAdmin ? "Admin" : "User"} */}
        <p
          className={`${
            user.isAdmin
              ? "text-slate-100 bg-green-800 text-center font-semibold   p-1 rounded-lg"
              : ""
          }`}
        >
          {/* {user.isAdmin ? "Admin" : "User"} */}
          {user?.isAdmin && "Admin"}
          {user?.role === "deliveryMan" && "Delivery Man"}
          {user?.role === "user" && "User"}
        </p>
      </Table.Cell>

      <Table.Cell>
        <p
          className="font-medium text-red-600 hover:underline  cursor-pointer"
          onClick={() => handleDeleteUser(user._id)}
        >
          <FaTrash />
        </p>
      </Table.Cell>
    </Table.Row>
  );
}
