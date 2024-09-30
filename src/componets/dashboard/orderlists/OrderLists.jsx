import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useOrders from "../../../hooks/orders/useOrders";
import Spinner from "../../loader/Spinner";
import { Link } from "react-router-dom";

export default function OrderLists() {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error, getOrdersByUserId, getAllOrders } = useOrders();
  const [ordersLists, setOrdersLists] = useState([]);

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getOrdersByUserId(id);
      setOrdersLists(res);
    };
    fetchData(currentUser?.user?._id, ordersLists);
  }, [currentUser?.user?._id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllOrders();
      setOrdersLists(res);
    };
    fetchData();
  }, [currentUser?.user?._id]);

  if (loading) {
    return <Spinner />;
  }

  if (ordersLists?.length === 0) {
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
    // <div className="w-full sm:max-w-6xl">
    //   {currentUser?.user.isAdmin ? (
    //     <h1 className="text-2xl font-bold text-center mb-8 text-slate-800">
    //       Order Lists for
    //       <span className="text-blue-600">Users</span>
    //     </h1>
    //   ) : (
    //     <h1 className="text-2xl font-bold text-center mb-8 text-slate-800">
    //       Order Lists for
    //       <span className="text-blue-600">{currentUser?.user?.userName}</span>
    //     </h1>
    //   )}

    //   <div className="overflow-x-auto w-full shadow-lg rounded-lg border border-gray-200">
    //     <table className="w-full bg-white">
    //       <thead className="bg-slate-100 text-slate-800">
    //         <tr>
    //           <th className="  uppercase font-semibold text-sm">Order ID</th>
    //           <th className="  uppercase font-semibold text-sm">Book Id</th>
    //           <th className="  uppercase font-semibold text-sm">Total Price</th>
    //           <th className="  uppercase font-semibold text-sm">Order Date</th>

    //           <th className="  uppercase font-semibold text-sm">
    //             Payment Method
    //           </th>
    //           <th className="  uppercase font-semibold text-sm">
    //             delivery Status
    //           </th>
    //           <th className="  uppercase font-semibold text-sm">
    //             Paid/Not Paid
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody className="text-gray-700">
    //         {/* {ordersLists.orders?.map((order) =>
    //           console.log(order.orderItems.map((order) => order.product))
    //         )} */}
    //         {ordersLists?.orders?.map((order, index) => (
    //           <tr
    //             key={order._id}
    //             className="hover:bg-gray-100 border-b  border-gray-200 transition duration-300"
    //           >
    //             <td className=" text-center cursor-pointer">
    //               <Link to={`/order/${order._id}`}>{order._id}</Link>
    //             </td>
    //             <td className=" text-center cursor-pointer">
    //               {order.orderItems.map((item) => (
    //                 <Link
    //                   key={item._id}
    //                   to={`/book/${item.product}`}
    //                   className="text-blue-600 underline"
    //                 >
    //                   {item.product}
    //                 </Link>
    //               ))}
    //             </td>

    //             <td className=" text-center font-semibold">
    //               BDT {order.totalPrice}
    //             </td>
    //             <td className=" text-center">
    //               {new Date(order.createdAt).toLocaleDateString()}
    //             </td>
    //             <td className=" text-center">{order.paymentMethod}</td>
    //             <td
    //               className={` text-center font-semibold ${
    //                 order.deliveryStatus === "Delivered"
    //                   ? "text-green-600"
    //                   : order.deliveryStatus === "On the Way"
    //                   ? "text-yellow-600"
    //                   : "text-red-600"
    //               }`}
    //             >
    //               {order.deliveryStatus}
    //             </td>
    //             <td
    //               className={`p-2 text-center ${
    //                 order.isPaid ? "text-green-600" : "text-red-600"
    //               }`}
    //             >
    //               {order.isPaid ? "paid" : "unpaid"}
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div className="w-full sm:max-w-5xl mx-auto px-4">
      {currentUser?.user.isAdmin ? (
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Order Lists for <span className="text-blue-600">Users</span>
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Order Lists for{" "}
          <span className="text-blue-600">{currentUser?.user?.userName}</span>
        </h1>
      )}

      <div className="overflow-x-auto w-full shadow-lg rounded-lg border border-gray-200 my-12">
        <table className="w-full bg-white table-auto">
          <thead className="bg-slate-200 text-slate-800">
            <tr className="text-left text-sm font-semibold uppercase">
              <th className="p-2 text-center">Order ID</th>
              <th className="p-2 text-center">Book ID</th>
              <th className="p-2 text-center">Total Price</th>
              <th className="p-2 text-center">Order Date</th>
              <th className="p-2 text-center">Payment Method</th>
              <th className="p-2 text-center">Delivery Status</th>
              <th className="p-2 text-center">Paid/Not Paid</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 w-full text-sm">
            {ordersLists?.orders?.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-100 border-b border-gray-200"
              >
                <td className="p-4 text-center">
                  <Link
                    to={`/order/${order._id}`}
                    className="text-blue-500 underline text-center w-1/3"
                  >
                    {order._id}
                  </Link>
                </td>
                <td className="p-4 text-center">
                  {order.orderItems.map((item) => (
                    <Link
                      key={item._id}
                      to={`/book/${item.product}`}
                      className="text-blue-500 underline text-center "
                    >
                      {item.product}
                    </Link>
                  ))}
                </td>
                <td className="p-4 text-center font-semibold">
                  BDT {order.totalPrice}
                </td>
                <td className="p-4 text-center">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">{order.paymentMethod}</td>
                <td
                  className={`p-4 text-center font-semibold ${
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
                  className={`p-4 text-center font-semibold ${
                    order.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
