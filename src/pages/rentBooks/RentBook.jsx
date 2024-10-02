import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RentBook({
  item,
  idx,
  handleSendToStore,
  currentUser,
  handleBlockUser,
  handleUnBlockUser,
}) {
  console.log(item);
  const today = new Date();
  const returnDate = new Date(item.returnDate);
  const diffTime = returnDate.getTime() - today.getTime();
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isOverdue = remainingDays < 0;

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
      <td className="py-3 px-4">
        {new Date(item?.returnDate).toLocaleDateString()}
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
              {item?.user?.isRedAlert ? (
                <button onClick={() => handleUnBlockUser(item?.user?._id)}>
                  Unblock
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleBlockUser(item?.user?._id, remainingDays)
                  }
                >
                  Take Action
                </button>
              )}
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
