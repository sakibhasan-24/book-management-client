import React from "react";
import { useSelector } from "react-redux";

export default function DeliveryMan() {
  const { currentlyLogin } = useSelector((state) => state.deliveryMan);
  console.log(currentlyLogin);
  return <div>DeliveryMan</div>;
}
