import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useOrders from "../../hooks/orders/useOrders";
import Spinner from "../../componets/loader/Spinner";
import Swal from "sweetalert2";
import { Alert } from "flowbite-react";

import useGetAllUsers from "../../hooks/user/useGetAllUsers";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Orders() {
  const { id: orderId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const {
    loading,
    error,
    getOrdersById,
    paymentServer,
    assignDeliveryManProduct,
  } = useOrders();

  const { getAllDeliveryMan, getUserById } = useGetAllUsers();
  const [deliveryMan, setDeliveryMan] = useState([]);
  const [assignedMan, setAssignedMan] = useState({});
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const [order, setOrder] = useState({});
  // load for set delivery man
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllDeliveryMan();
      // console.log(res?.deliveryMan);
      setDeliveryMan(res?.deliveryMan);
    };
    fetchData();
  }, [assignedMan, order]);
  // console.log(deliveryMan);

  // load for get deliveryMan details
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getUserById(id);
      // console.log(res);
      setAssignedMan(res.user);
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

  // console.log(assignedMan?.userName);
  // console.log(deliveryMan);
  const handleAssignDeliveryMan = async (orderId, deliveryManId) => {
    try {
      const res = await assignDeliveryManProduct(orderId, deliveryManId);
      // console.log("fff", res);
      if (res.data?.success) {
        console.log(res);
        Swal.fire({
          title: "Success",
          text: "Delivery Man Assigned Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        // console.log(res);
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(order?.assignedDeliveryMan);

  const orderRef = useRef(null);
  const downloadPDF = async () => {
    const canvas = await html2canvas(orderRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();

    const imgWidth = 140;
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save("Admin_Dashboard_Report.pdf");
  };
  if (loading)
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="w-full  p-2 sm:p-4 sm:max-w-6xl mx-auto my-12 ">
      <div ref={orderRef}>
        <div className="text-center my-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            download Report
          </button>
        </div>
        <h1 className="text-slate-700 font-semibold text-2xl ">
          Order <span className="font-bold text-slate-950">{orderId}</span>{" "}
        </h1>
        <section className="flex flex-col sm:flex-row">
          <div className="flex-1  sm:basis-[60%]">
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
              <div className="w-full sm:w-1/4 my-6">
                <p
                  className={`px-3 py-2  rounded-lg text-center font-bold text-white ${
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

            {order.assignedDeliveryMan && (
              <div className="my-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Assigned Delivery Man Details:
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Name:</strong> {assignedMan?.userName}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> {assignedMan?.userEmail}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Phone:</strong> {assignedMan?.phone}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {currentUser?.user?.isAdmin && (
        <div className="my-8 p-6  shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold text-slate-700 mb-4">
            Assign Delivery Man
          </h1>
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 font-semibold appearance-none transition ease-in-out duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 hover:bg-gray-100"
              onChange={(e) => setSelectedDeliveryMan(e.target.value)}
            >
              {deliveryMan?.map((man) => (
                <option key={man._id} value={man._id}>
                  {man.userName}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 absolute right-4 top-3 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <button
              onClick={() =>
                handleAssignDeliveryMan(orderId, selectedDeliveryMan)
              }
              disabled={order?.assignedDeliveryMan}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 my-4 rounded-md text-white font-bold py-2 px-4 "
            >
              {order?.assignedDeliveryMan
                ? "Already Assigned"
                : "Assign Delivery Man"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
