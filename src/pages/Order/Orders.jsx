import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useOrders from "../../hooks/orders/useOrders";
import Spinner from "../../componets/loader/Spinner";
import Swal from "sweetalert2";
import { Alert } from "flowbite-react";
import useDeliveryMan from "../../hooks/deliveryMan/useDeliveryMan";

export default function Orders() {
  const { id: orderId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const {
    loading,
    error,
    getOrdersById,
    paymentServer,
    assignDeliveryMan,
    assignDeliveryManProduct,
  } = useOrders();
  const { getAllDeliveryMan, getAllDeliveryManById } = useDeliveryMan();
  const [deliveryMan, setDeliveryMan] = useState([]);
  const [assignedMan, setAssignedMan] = useState({});
  const [order, setOrder] = useState({});
  // load for set delivery man
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllDeliveryMan();

      setDeliveryMan(res.deliveryman);
    };
    fetchData();
  }, [assignedMan, order]);

  // load for get deliveryMan details
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getAllDeliveryManById(id);
      // console.log(res);
      setAssignedMan(res.deliveryman);
    };
    if (order?.assignedDeliveryMan) {
      fetchData(order?.assignedDeliveryMan);
    }
  }, [order?.assignedDeliveryMan, order]);
  // console.log("a", assignedMan);
  // console.log("o", order?.assignedDeliveryMan);
  const navigate = useNavigate();
  // console.log(currentUser.user._id);
  // console.log(orderId);
  // load this data based on id
  // show the ui
  // add payment button
  // pdf print button
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    const fetchData = async (id) => {
      const data = await getOrdersById(id);
      setOrder(data.order);
    };
    fetchData(orderId);
  }, [currentUser.user._id, orderId]);
  useEffect(() => {
    let interval;
    if (polling) {
      interval = setInterval(async () => {
        const updatedData = await getOrdersById(orderId);
        setOrder(updatedData.order);
        if (updatedData.order.isPaid) {
          setPolling(false);
          clearInterval(interval);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [polling, orderId, getOrdersById]);
  const handlePay = async () => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await paymentServer(order, orderId);
        if (res?.data) window.open(res.data, "_blank");
        console.log(res);
        setPolling(true);
      }
    });
  };

  // const handlePay = async () => {
  //   // console.log("pay");
  //   Swal.fire({
  //     title: "Are you sure ?",

  //     icon: "Success",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, continue it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       // console.log(order);
  //       const res = await paymentServer(order, orderId);
  //       // console.log(res);
  //       if (res?.data) window.location.href = res.data;
  //     }
  //   });
  // };

  // console.log(order);
  const handleAssignDeliveryMan = async (orderId, deliveryManId) => {
    try {
      const res = await assignDeliveryMan(orderId, deliveryManId);
      // console.log(res);
      if (res?.data?.success) {
        Swal.fire({
          title: "Success",
          text: "Delivery Man Assigned Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });

        // Update the order with the newly assigned delivery man
        setOrder((prevOrder) => ({
          ...prevOrder,
          assignedDeliveryMan: deliveryManId,
        }));

        // Fetch the newly assigned delivery man's details
        const deliveryManRes = await getAllDeliveryManById(deliveryManId);
        setAssignedMan(deliveryManRes.deliveryman);
        const productRes = await assignDeliveryManProduct(
          orderId,
          deliveryManId
        );
        // console.log(productRes);
      } else {
        Swal.fire({
          title: "Error",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Already Delivery Man Assigned",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  if (loading)
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="w-full p-4 sm:max-w-6xl mx-auto my-12 ">
      <div>
        <h1 className="text-slate-700 font-semibold text-2xl ">
          Order <span className="font-bold text-slate-950">{orderId}</span>{" "}
        </h1>
        <section className="flex">
          <div className="flex-1 basis-[60%]">
            <div className="my-4 ">
              <h1 className="text-4xl font-bold text-slate-700 my-4">
                Shipping
              </h1>
              <div className="space-y-2">
                <p className="text-md text-slate-700 font-semibold flex items-center space-x-2">
                  <span className="text-slate-600">Name:</span>
                  <span className="font-bold text-slate-600">
                    {order?.deliveryAddress?.name}
                  </span>
                </p>

                <p className="text-md text-slate-700 font-semibold flex items-center space-x-2">
                  <span className="text-slate-600">Email:</span>
                  <span className="font-bold text-slate-600">
                    {order?.deliveryAddress?.email}
                  </span>
                </p>
                <p className="text-md text-slate-700 font-semibold flex items-center space-x-2">
                  <span className="text-slate-600">Phone:</span>
                  <span className="font-bold text-slate-600">
                    {order?.deliveryAddress?.phone}
                  </span>
                </p>
                <p className="text-md text-slate-700 font-semibold flex items-center space-x-2">
                  <span className="text-slate-600">Address:</span>
                  <span className="font-bold text-slate-600">
                    {order?.deliveryAddress?.address}
                  </span>
                </p>
              </div>
              <div className="w-1/4 my-6">
                <p
                  className={`px-3 py-2 rounded-lg text-center font-bold text-white ${
                    order.deliveryStatus === "Not Delivered"
                      ? "bg-red-500"
                      : order.deliveryStatus === "On the Way"
                      ? "bg-yellow-500"
                      : order.deliveryStatus === "Delivered"
                      ? "bg-green-500"
                      : "bg-gray-500" // fallback color
                  }`}
                >
                  {order.deliveryStatus}
                </p>
                <p className="text-md text-slate-700 font-semibold flex items-center space-x-2">
                  {order.isDelivered && "delivery time"}
                </p>
              </div>
              <div className="w-1/2 border-b-[1px] border-slate-800"></div>
              <div className="my-4">
                <h1 className="text-lg font-bold text-slate-800 mb-2">
                  Payment Method
                </h1>
                <div className="flex items-center space-x-2">
                  <p className="text-md text-slate-700 font-semibold">
                    Method:
                  </p>
                  <span className="text-md text-blue-600 font-bold">
                    {order.paymentMethod}
                  </span>
                </div>
                <p
                  className={`my-6 w-1/4 px-3 py-2 text-md font-bold text-center rounded-lg ${
                    order.isPaid
                      ? "bg-green-800 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </p>
                {order.isPaid && (
                  <p className="text-md text-slate-700 font-semibold">
                    Paid at:{" "}
                    {new Date(order.paidAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true, // For 12-hour format with AM/PM
                    })}
                  </p>
                )}
                {order.isPaid && (
                  <p className="text-md text-slate-700 font-semibold flex items-center space-x-2">
                    transactionId: {order.transactionId}
                  </p>
                )}
                <div className="w-1/2 border-b-[1px] border-slate-800"></div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800 mb-2">
                    Order Items
                  </h1>
                  <div className="w-full p-2 sm:w-1/2">
                    {order?.orderItems?.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className=" border-[1px] border-slate-700 p-4 flex items-center justify-between "
                        >
                          <div className="flex items-center space-x-2">
                            <img
                              src={item.imagesUrls[0]}
                              alt="imgs"
                              className="w-12 h-10 object-cover"
                            />
                            <p className="text-md text-slate-700 underline ">
                              {item.title}
                            </p>
                          </div>
                          <p className="font-bold text-xl">BDT{item.price}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full basis-[30%] ">
            <div className="h-[300px] shadow-2xl shadow-slate-400 rounded-lg p-4 bg-white">
              <h1 className="text-center text-lg font-bold underline text-gray-800 mb-6">
                Order Summary
              </h1>
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <p className="text-lg text-slate-700">Items:</p>
                <p className="font-semibold text-gray-900">
                  BDT {order.productPrice}
                </p>
              </div>
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <p className="text-lg text-slate-700">Shipping Price:</p>
                <p className="font-semibold text-gray-900">
                  BDT {order.shippingPrice}
                </p>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-lg text-slate-700">Total:</p>
                <p className="font-bold text-lg text-blue-700">
                  BDT {order.totalPrice}
                </p>
              </div>
              <button
                onClick={handlePay}
                className={`w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300 ${
                  order.isPaid ? "cursor-not-allowed" : ""
                }`}
              >
                {order.isPaid ? "Paid,thank you" : "Pay Now"}
              </button>
            </div>

            {currentUser?.user.isAdmin && (
              <div className="my-6">
                <h1 className="text-xl font-bold text-gray-800 mb-4">
                  Assign Delivery Man
                </h1>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  onChange={(e) =>
                    handleAssignDeliveryMan(order._id, e.target.value)
                  }
                  value={
                    order.assignedDeliveryMan
                      ? order.assignedDeliveryMan._id
                      : ""
                  }
                >
                  {/* Default option when no delivery man is assigned */}
                  <option value="" disabled>
                    {order.assignedDeliveryMan
                      ? "Assigned Delivery Man"
                      : "Please select a member"}
                  </option>

                  {/* Dynamically rendering delivery men */}
                  {deliveryMan.map((man) => (
                    <option key={man._id} value={man._id}>
                      {man.name} -{" "}
                      {man.isAvailable ? "Available" : "Not Available"}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {order.assignedDeliveryMan && (
              <div className="my-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Assigned Delivery Man Details:
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Name:</strong> {assignedMan?.name}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> {assignedMan?.email}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Phone:</strong> {assignedMan?.phone}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
