import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useOrders from "../../../hooks/orders/useOrders";
import Spinner from "../../loader/Spinner";
import { Link } from "react-router-dom";

// show list of orders based on users
// show order details
// show order status
// show order total
// show order date
// show order time
// show order address
// show order payment method
//delivery status
// admin assign delivery man
// delivery man accept order
// delivery man deliver order
// delivery man complete order

export default function OrderLists() {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error, getOrdersByUserId } = useOrders();
  const [ordersLists, setOrdersLists] = useState([]);
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getOrdersByUserId(id);
      setOrdersLists(res);
    };
    fetchData(currentUser.user._id);
  }, [currentUser.user._id]);
  //   console.log(ordersLists);
  if (loading) {
    return <Spinner />;
  }
  if (ordersLists.length === 0) {
    return (
      <h1 className="text-center text-xl font-bold text-slate-800">
        No Orders Found{" "}
        <Link
          className="text-slate-200 bg-blue-900  p-2 text-xs rounded-lg"
          to="/"
        >
          Add Orders
        </Link>
      </h1>
    );
  }
  return (
    <div className="max-w-full  mx-auto p-4 ">
      <h1 className="text-xl font-bold text-center mb-4 text-slate-800">
        Order Lists for{" "}
        <span className="text-2xl text-blue-600">
          {currentUser?.user?.userName}
        </span>
      </h1>
    </div>
  );
}
