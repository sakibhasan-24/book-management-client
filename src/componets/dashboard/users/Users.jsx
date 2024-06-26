import React, { useEffect, useState } from "react";
import useGetAllUsers from "../../../hooks/user/useGetAllUsers";
import Spinner from "../../loader/Spinner";
import { Table } from "flowbite-react";
import User from "./User";

import Swal from "sweetalert2";

export default function Users() {
  const { loading, getAllUsers, users, setUsers, deleteUser, error } =
    useGetAllUsers();
  //   const { deleting, deleteUser } = useDeleteUser();
  const [search, setSearch] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
    setUsers(users);
    // setUsers(filteredUsers);
  }, [users]);

  useEffect(() => {
    if (search === "") {
      setFilteredUsers(users);
      setUsers(users);
    } else {
      setFilteredUsers(
        users?.filter((user) =>
          user.userName.toLowerCase().includes(search.toLowerCase())
        )
      );
      //   setUsers(filteredUsers);
    }
  }, [search, users]);

  //   delete user
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
        if (!res) {
          return Swal.fire("Failed!", "User has not been deleted.", "error");
        }

        if (res.success) {
          setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
          setUsers(users.filter((user) => user._id !== id));
          console.log(users);
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          Swal.fire("Failed!", "User has not been deleted.", "error");
        }
      }
    });
    try {
    } catch (error) {
      console.log(error);
    }
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
      <div className=" overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell> name</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell> books</Table.HeadCell>
            <Table.HeadCell>Profit</Table.HeadCell>
            <Table.HeadCell>Remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
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
    </div>
  );
}

/* 

 {
    
    users && users?.length>0 && users.map((user)=>{
        return <div key={user.id}>{user.name}</div>
    })
    }
*/
