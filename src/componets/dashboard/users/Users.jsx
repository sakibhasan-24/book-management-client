import React, { useEffect, useState } from "react";
import useGetAllUsers from "../../../hooks/user/useGetAllUsers";
import Spinner from "../../loader/Spinner";
import { Table } from "flowbite-react";
import User from "./User";
import Swal from "sweetalert2";

export default function Users() {
  const { loading, getAllUsers, users, setUsers, deleteUser } =
    useGetAllUsers();
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Adjust this number to change items per page

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
    setUsers(users);
  }, [users]);

  useEffect(() => {
    if (search === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users?.filter((user) =>
          user.userName.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, users]);

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(id);
        if (res && res.success) {
          setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
          setUsers(users.filter((user) => user._id !== id));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          Swal.fire("Failed!", "User has not been deleted.", "error");
        }
      }
    });
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <Spinner />;
  if (users.length === 0)
    return <h1 className="text-4xl text-center font-bold">No users found</h1>;

  return (
    <div className="w-full sm:max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-10">
      <form>
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search"
          className="w-2/3 mx-2 p-3 my-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-slate-50"
        />
      </form>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentUsers && currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <User
                  key={user._id}
                  user={user}
                  handleDeleteUser={handleDeleteUser}
                />
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center">
                  No users found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
