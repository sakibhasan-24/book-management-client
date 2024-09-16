import React from "react";
import { useSelector } from "react-redux";

export default function DeliveryMan() {
  const { currentlyLogin } = useSelector((state) => state.deliveryMan);
  // console.log(currentlyLogin);
  return (
    <div className="max-w-6xl mz-auto my-12 p-4 ">
      <h1 className="text-center text-3xl font-bold mb-4">Profile</h1>
      <h1 className="font-bold text-2xl text-center mb-4">
        Currently Pending Order {""}
        <span className="text-blue-500 ">
          {currentlyLogin?.assignedOrders.length}
        </span>
      </h1>
    </div>
  );
}
