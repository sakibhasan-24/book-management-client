import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import useGetBooks from "../../hooks/books/useGetBooks";
import useRentBooks from "../../hooks/books/useRentBooks";
import RentBook from "./RentBook";
import { toast } from "react-toastify";

export default function RentBooks() {
  const [rentBooks, setRentBooks] = useState([]);
  // const { loading } = useGetBooks();
  const { loading, getAllRentBooks, backBook, blockUser, unBlockUser } =
    useRentBooks();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser?.user?._id);
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getAllRentBooks(id);
      // console.log(res?.rentBooks);
      setRentBooks(res.rentBooks);
    };
    fetchData(currentUser?.user?._id);
  }, [currentUser?.user?._id]);
  // console.log(rentBooks);
  const handleSendToStore = async (id, productId, onUpdateBookStatus) => {
    const res = await backBook(id, {
      bookStatus: "available",
      user: currentUser?.user?._id,
      productId: productId,
    });

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

  const handleBlockUser = async (id, remainingDays) => {
    console.log(id);
    if (remainingDays > 0) {
      toast.error("You can't block user until he Overdue the time");
      return;
    }
    const res = await blockUser(id);

    if (res.success) {
      toast.success("You Blocked This User");
    }
    if (res.success === false) {
      toast.error("User is Already Blocked");
    }
    // console.log(res);
  };
  const handleUnBlockUser = async (id) => {
    console.log(id);
    const res = await unBlockUser(id);
    // console.log(res);
    if (res.success) {
      toast.success("You UnBlocked This User");
    }
  };
  if (!rentBooks) return <h1>No rent Books found</h1>;

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
                User Email
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Return Date
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
                handleUnBlockUser={handleUnBlockUser}
                handleBlockUser={handleBlockUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
