import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setFromNowRemainingDays,
  setNotice,
} from "../../redux/notifications/notificationSlice";

export default function RentBook({
  item,
  idx,
  handleSendToStore,
  currentUser,
  numberOfRentBooks,
  modifyReturnDate,
}) {
  const dispatch = useDispatch();
  // console.log(item.isBack);

  // console.log(item);
  const today = new Date();
  const returnDate = new Date(item.returnDate);

  // Add 10 extra days to the return date
  returnDate.setDate(returnDate.getDate() + 10);

  // Calculate the time difference between the return date and today
  const diffTime = returnDate.getTime() - today.getTime();

  // Calculate remaining days, rounding up to the nearest whole number
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Check if the item is overdue
  const isOverdue = remainingDays < 0;
  // if (remainingDays === 55 || remainingDays === 34) {
  //   dispatch(setNotice("You have One book to return"));
  //   dispatch(setFromNowRemainingDays(remainingDays));
  // }
  if (numberOfRentBooks.length > 0) {
    dispatch(setNotice("You have One book to return"));
    dispatch(setFromNowRemainingDays(remainingDays));
  }

  const [bookStatus, setBookStatus] = useState(
    item.bookStatus === "rent" ? "rent" : item.bookStatus
  );

  const onUpdateBookStatus = (id, status) => {
    if (item.product === id) {
      setBookStatus(status);
    }
  };

  return (
    <tr className="hover:bg-gray-100 border-b border-gray-200 transition duration-200">
      <td className="py-3 px-4">{idx + 1}</td>
      <td className="py-3 px-4">
        <Link to={`/book/${item.product}`}>details</Link>
      </td>
      <td className="py-3 px-4">
        {item?.user?.userEmail}- {item?.user?.isRedAlert && "Blocked"}
      </td>
      <td className="py-3 px-4">{item?.bookOwner?.userEmail}</td>
      <td className="py-3 px-4">
        {new Date(item?.returnDate).toLocaleDateString()}
      </td>
      <td className="py-3 px-4">
        {new Date(item?.returnDate).setDate(
          new Date(item?.returnDate).getDate() + 10
        ) &&
          new Date(
            new Date(item?.returnDate).setDate(
              new Date(item?.returnDate).getDate() + 10
            )
          ).toLocaleDateString()}
      </td>
      <td className="py-3 px-4">{remainingDays} Days</td>
      <td className="py-3 px-4">
        {isOverdue ? (
          <span className="text-red-500">Overdue</span>
        ) : (
          <span className="text-green-500">On Time</span>
        )}
      </td>
      {currentUser?.user?.isAdmin ? (
        <td>
          {item?.isBack ? (
            <p>Returned</p>
          ) : (
            <div>
              <p>Not Return Yet</p>
            </div>
          )}
        </td>
      ) : (
        <td>
          {item?.isBack ? (
            <p>Returned</p>
          ) : (
            <button
              onClick={() =>
                handleSendToStore(item.product, item._id, onUpdateBookStatus)
              }
            >
              Send to Store
            </button>
          )}
        </td>
      )}

      {/* <td>{item.isBack ? "Back" : "Not Back"}</td> */}
    </tr>
  );
}
