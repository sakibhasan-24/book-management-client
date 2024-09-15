import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useOrders from "../../../hooks/orders/useOrders";
import Spinner from "../../loader/Spinner";
import { Link } from "react-router-dom";

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

  if (loading) {
    return <Spinner />;
  }

  if (ordersLists.length === 0) {
    return (
      <h1 className="text-center text-xl font-bold text-slate-800">
        No Orders Found{" "}
        <Link
          className="text-slate-200 bg-blue-900 p-2 text-xs rounded-lg"
          to="/"
        >
          Add Orders
        </Link>
      </h1>
    );
  }

  return (
    <div className="max-w-5xl mx-auto  ">
      <h1 className="text-2xl font-bold text-center mb-8 text-slate-800">
        Order Lists for{" "}
        <span className="text-blue-600">{currentUser?.user?.userName}</span>
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-slate-100 text-slate-800">
            <tr>
              <th className="w-1/6 py-2 px-2 uppercase font-bold text-sm">
                Order ID
              </th>
              <th className="w-1/6 py-2 px-2 uppercase font-bold text-sm">
                Book Id
              </th>
              <th className="w-1/6 py-2 px-2 uppercase font-bold text-sm">
                Total Price
              </th>
              <th className="w-1/6 py-2 px-2 uppercase font-bold text-sm">
                Order Date
              </th>

              <th className="w-1/6 py-2 px-2 uppercase font-bold text-sm">
                Payment Method
              </th>
              <th className="w-1/6 py-2 px-2 uppercase font-bold text-sm">
                delivery Status
              </th>
              <th className="w-1/6 py-2 px-2 uppercase font-bold text-sm">
                Paid/Not Paid
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {/* {ordersLists.orders?.map((order) =>
              console.log(order.orderItems.map((order) => order.product))
            )} */}
            {ordersLists?.orders?.map((order, index) => (
              <tr
                key={order._id}
                className="hover:bg-gray-100 border-b  border-gray-200 transition duration-300"
              >
                <td className="p-2 text-center cursor-pointer">
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td className="p-2 text-center cursor-pointer">
                  {order.orderItems.map((item) => (
                    <Link
                      key={item._id}
                      to={`/book/${item.product}`}
                      className="text-blue-600 underline"
                    >
                      {item.product}
                    </Link>
                  ))}
                </td>

                <td className="p-2 text-center font-semibold">
                  BDT {order.totalPrice}
                </td>
                <td className="p-2 text-center">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 text-center">{order.paymentMethod}</td>
                <td
                  className={`p-2 text-center font-semibold ${
                    order.deliveryStatus === "Delivered"
                      ? "text-green-600"
                      : order.deliveryStatus === "On the Way"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.deliveryStatus}
                </td>
                <td
                  className={`p-2 text-center ${
                    order.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.isPaid ? "paid" : "unpaid"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
