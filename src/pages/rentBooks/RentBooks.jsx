import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useGetBooks from "../../hooks/books/useGetBooks";
import useRentBooks from "../../hooks/books/useRentBooks";
import RentBook from "./RentBook";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useGetAllUsers from "../../hooks/user/useGetAllUsers";
import {
  clearNotice,
  setFromNowRemainingDays,
  setNotice,
  setNumberOfBooks,
} from "../../redux/notifications/notificationSlice";
import RentBooksPdf from "./RentBooksPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function RentBooks() {
  const dispatch = useDispatch();
  // const { fromNowRemainingDays, notice, numberOfBooks } = useSelector(
  //   (state) => state.notification
  // );
  // console.log(notification);
  // setFromNowRemainingDays
  // setNotice

  const [rentBooks, setRentBooks] = useState([]);
  const [overDueUsers, setOverDueUsers] = useState([]);
  const [modifyReturnDate, setModifyReturnDate] = useState(null);

  const [users, setUsers] = useState([]);
  const { getAllUsers } = useGetAllUsers();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      setUsers(res.users);
    };
    fetchData();
  }, []);

  // const { loading } = useGetBooks();
  const {
    loading,
    getAllRentBooks,
    backBook,
    blockUser,
    unBlockUser,
    getAllOverDueUsers,
  } = useRentBooks();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser?.user?._id);

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getAllOverDueUsers(id);
      console.log(res);
      if (res.success === true) setOverDueUsers(res.overdueUsers);
    };
    if (currentUser?.user?.role === "admin") fetchData(currentUser?.user?._id);
  }, []);

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getAllRentBooks(id);
      // console.log(res?.rentBooks);
      setModifyReturnDate(res?.modifyReturnedDate);
      setRentBooks(res.rentBooks);
    };
    fetchData(currentUser?.user?._id);
  }, [currentUser?.user?._id]);
  // console.log(modifyReturnDate);
  const handleSendToStore = async (id, productId, onUpdateBookStatus) => {
    const res = await backBook(id, {
      bookStatus: "available",
      user: currentUser?.user?._id,
      productId: productId,
    });

    // console.log(res);
    if (res?.success) {
      toast.success("Book returned successfully");

      onUpdateBookStatus(id, "available");

      const res = await getAllRentBooks(currentUser?.user?._id);
      console.log(res?.rentBooks);

      setRentBooks((prevBooks) =>
        prevBooks.filter((book) => book.product !== id)
      );

      setRentBooks(res.rentBooks);
      return;
    } else {
      toast.error("Something went wrong");
    }
  };

  const today = new Date();
  const numberOfRentBooks = rentBooks.filter((b) => {
    const returnDate = new Date(b.returnDate);
    // console.log(returnDate < today);
    return !b.isBack && returnDate < today;
  });
  // console.log(numberOfRentBooks);
  if (numberOfRentBooks.length === 0) {
    dispatch(clearNotice());
  }
  if (numberOfRentBooks.length > 0) {
    // setNumberOfBooks
    dispatch(setNumberOfBooks(numberOfRentBooks.length));
  }
  // console.log(notification);
  // console.log(numberOfRentBooks?.length);
  useEffect(() => {
    if (numberOfRentBooks.length > 0) {
      Swal.fire({
        title: "You have some books not returned yet",
        text: "Please return the books",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
    }
  }, [numberOfRentBooks]);
  const handleBlockUser = async (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to block this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, block it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await blockUser(id);
        if (!res) {
          toast.error("No valid Reason for blocked");
          return;
        }
        console.log(res);
        if (res.success) {
          toast.success("User blocked successfully");
          const res = await getAllOverDueUsers(currentUser?.user?._id);
          setOverDueUsers(res.overdueUsers);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, isRedAlert: true } : user
            )
          );
        }
      }
    });
    // console.log(res);
  };
  const handleUnBlockUser = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to unblock this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await unBlockUser(id);
        if (res.success) {
          toast.success("You UnBlocked This User");
          const res = await getAllOverDueUsers(currentUser?.user?._id);
          setOverDueUsers(res.overdueUsers);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, isRedAlert: true } : user
            )
          );
        }
      }
    });
  };
  if (!rentBooks || rentBooks.length === 0)
    return (
      <div className="flex items-center justify-center my-12 text-4xl font-bold ">
        <p className="text-green-600">Currently You have no rent books</p>
      </div>
    );
  // console.log(users, "users");
  // console.log(rentBooks, "rentBooks");
  console.log(overDueUsers, "overDueUsers");
  // if (overDueUsers?.length === 0) {
  //   if (currentUser?.user?.role === "admin") {
  //     return (
  //       <div className="flex items-center justify-center my-12 text-4xl font-bold ">
  //         <p className="text-green-600">Currently no OverDue User</p>
  //       </div>
  //     );
  //   }
  // }
  return (
    <div className="w-full sm:max-w-4xl mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                No
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                book Id
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Customer Email
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Owner Email
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Return Date
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Adjust Date
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Remaining Days
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Status
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-center">
                Update
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {rentBooks?.map((item, idx) => (
              <RentBook
                item={item}
                key={item._id}
                idx={idx}
                handleSendToStore={handleSendToStore}
                currentUser={currentUser}
                numberOfRentBooks={numberOfRentBooks}
                modifyReturnDate={modifyReturnDate}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* {rentBooks?.length > 0 && currentUser?.user?.role === "admin" && "elll"} */}
      {rentBooks?.length > 0 && currentUser?.user?.role === "admin" && (
        <PDFDownloadLink
          document={<RentBooksPdf rentBooks={rentBooks} />}
          fileName="rented_books_report.pdf"
        >
          <button className="bg-green-500 text-slate-100 p-2 rounded-md mt-4">
            Download Rented Books Report
          </button>
        </PDFDownloadLink>
      )}

      {overDueUsers?.length === 0 && currentUser?.user?.role === "admin" && (
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">No Overdue Users</h2>
        </div>
      )}
      {overDueUsers &&
        overDueUsers?.length > 0 &&
        currentUser?.user?.role === "admin" && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Overdue Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <tr>
                    <th className="py-3 px-4 font-semibold uppercase text-left">
                      No
                    </th>
                    <th className="py-3 px-4 font-semibold uppercase text-left">
                      User Name
                    </th>
                    <th className="py-3 px-4 font-semibold uppercase text-left">
                      User Email
                    </th>
                    <th className="py-3 px-4 font-semibold uppercase text-left">
                      Image
                    </th>
                    <th className="py-3 px-4 font-semibold uppercase text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {overDueUsers?.map((user, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-100 border-b border-gray-200 transition duration-200"
                    >
                      <td className="py-3 px-4">{idx + 1}</td>
                      <td>{user?.userName}</td>
                      <td>{user?.userEmail}</td>
                      <td>
                        <img
                          className="h-20 w-20 rounded-full"
                          src={user?.image}
                          alt="img"
                        />
                      </td>
                      <td>
                        {user?.isRedAlert ? (
                          <button
                            onClick={() => handleUnBlockUser(user?._id)}
                            className="text-red-800 hover:underline"
                          >
                            Blocked
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlockUser(user?._id)}
                            className="text-red-800 hover:underline"
                          >
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* {currentUser?.user?.role === "admin" && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Overdue Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <tr>
                  <th className="py-3 px-4 font-semibold uppercase text-left">
                    No
                  </th>

                  <th className="py-3 px-4 font-semibold uppercase text-left">
                    User Name
                  </th>
                  <th className="py-3 px-4 font-semibold uppercase text-left">
                    User Email
                  </th>
                  <th className="py-3 px-4 font-semibold uppercase text-left">
                    Image
                  </th>
                  <th className="py-3 px-4 font-semibold uppercase text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {users &&
                  users?.length > 0 &&
                  users?.map((user, idx) => (
                    <tr className="hover:bg-gray-100 border-b border-gray-200 transition duration-200">
                      <td className="py-3 px-4">{idx + 1}</td>
                      <td>{user?.userName}</td>
                      <td>{user?.userEmail}</td>
                      <td>
                        <img
                          className="rounded-full w-10 h-10"
                          src={user?.image}
                          alt="img"
                        />
                      </td>
                      <td>
                        {user?.isRedAlert ? (
                          <button
                            onClick={() => handleUnBlockUser(user?._id)}
                            className="text-red-800 hover:underline"
                          >
                            unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlockUser(user?._id)}
                            className="text-red-800 hover:underline"
                          >
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </div>
  );
}
