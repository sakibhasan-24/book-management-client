import React, { useEffect, useState } from "react";
import useGetAllUsers from "../../../hooks/user/useGetAllUsers";
import { toast } from "react-toastify";
import useDeliveryMan from "../../../hooks/user/useDeliveryMan";
import Swal from "sweetalert2";

export default function ApplyStatus() {
  const { getAllUsers, getUserById, users, setUsers } = useGetAllUsers();
  const { acceptUserRequest, rejectUserRequest } = useDeliveryMan();
  useEffect(() => {
    getAllUsers();
  }, []);
  const [appliedUsers, setAppliedUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const appliedUsersFromUser = users.filter(
        (user) => user?.isDeliveryPersonApplied
      );
      //   setAppliedUsers(appliedUsers);
      console.log(appliedUsersFromUser);
      setAppliedUsers(appliedUsersFromUser);
    };
    fetchUser();
  }, [users]);
  const handleAccept = async (id) => {
    try {
      const res = await acceptUserRequest(id);
      if (res.success) {
        toast.success("User approved as delivery person");
        setAppliedUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, isDeliveryPerson: true } : user
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //   const handleReject = async (id) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, reject it!",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         try {
  //           const res = await rejectUserRequest(id);
  //           if (res.success) {
  //             toast.success("User rejected as delivery person");
  //             setAppliedUsers((prevUsers) =>
  //               prevUsers.filter((user) =>
  //                 user._id !== id ? { ...user, isDeliveryPerson: false } : user
  //               )
  //             );
  //           }
  //           Swal.fire("Rejected!", "User has been rejected.", "success");
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     });
  //   };

  const handleReject = async (id) => {
    // console.log(res);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await rejectUserRequest(id);
          //   console.log(res);
          if (res) {
            toast.success("User rejected as delivery person");
            setAppliedUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== id)
            );
            Swal.fire("Rejected!", "User has been rejected.", "success");
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
    });
  };

  return (
    <div className="w-full sm:max-w-4xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold text-center mb-4 text-slate-500">
        status for Delivery Person
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {appliedUsers &&
          appliedUsers.map((user) => (
            <div
              key={user._id}
              className="bg-slate-100 space-y-4 p-4 text-center rounded-lg shadow-md mb-4 w-full"
            >
              <h2 className="text-xl font-bold  mb-2">{user.userName}</h2>
              <p className="text-center">{user.userEmail}</p>
              <div>
                {user.isDeliveryPerson ? (
                  <p className="text-green-600">Approved</p>
                ) : (
                  <p className="text-red-600">Not Approved yet</p>
                )}
                {user?.isDeliveryPerson === false && (
                  <div className="flex items-center justify-between gap-6 my-6">
                    <button
                      onClick={() => handleAccept(user?._id)}
                      className="p-1 rounded-lg bg-green-600 text-white font-semibold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(user?._id)}
                      className="p-1 rounded-lg bg-red-600 text-white font-semibold"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
              <button className="text-center font-bold bg-blue-600 text-slate-100 rounded-md p-2 w-full">
                details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
