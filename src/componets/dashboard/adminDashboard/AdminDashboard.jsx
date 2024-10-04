import React, { useEffect, useState } from "react";
import useOrders from "../../../hooks/orders/useOrders";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  ShoppingCartOutlined,
  TruckOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import SystemProfit from "./SystemProfit";
import UserAnalysis from "./UserAnalysis";
import BooksAdminDashboard from "./BooksAdminDashboard";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const { getAllOrders } = useOrders();
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    fetchData();
  }, []);

  //   console.log(orders);
  // Calculate total and pending orders percentage
  const totalOrders = orders?.orders?.length || 0;
  const pendingOrders = orders?.shippedOrders?.length || 0;
  const pendingPercentage = totalOrders
    ? ((pendingOrders / totalOrders) * 100).toFixed(2)
    : 0;

  // Chart data focusing on pending orders
  const chartData = {
    labels: ["Pending Orders", "Other Orders"],
    datasets: [
      {
        label: "Orders",
        data: [pendingOrders, totalOrders - pendingOrders],
        backgroundColor: ["#EF4444", "#10B981"], // Red for Pending, Green for Others
        hoverBackgroundColor: ["#B91C1C", "#047857"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full sm:max-w-4xl mx-auto p-4">
      <h1 className="text-center font-bold text-3xl mb-6 text-slate-800">
        Admin Dashboard
      </h1>

      {/* Pending Orders Percentage Display */}
      <div className="my-6 bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-slate-700 mb-4">
          Pending Orders Overview
        </h2>
        <p className="text-2xl font-semibold text-red-600">
          Pending Orders: {pendingPercentage}%
        </p>

        {/* Small Chart Section */}
        <div className="w-48 h-48 mx-auto mt-4">
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Orders Overview Links */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          className="bg-green-600 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-green-500 hover:scale-105 hover:shadow-2xl"
          to={`/dashboard/orders/${currentUser?.user?._id}`}
        >
          <ShoppingCartOutlined
            style={{ fontSize: "24px", marginRight: "10px" }}
          />
          <p className="text-lg">All Orders</p>
          <p className="text-sm mt-2">Total Orders: {totalOrders}</p>
        </Link>

        <Link
          className="bg-blue-600 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-2xl"
          to={`/dashboard/orders/${currentUser?.user?._id}`}
        >
          <TruckOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <p className="text-lg">Shipped Orders</p>
          <p className="text-sm mt-2">
            Shipped Orders:{" "}
            {orders?.deliveredOrders?.length > 0
              ? orders?.deliveredOrders?.length
              : "None"}
          </p>
        </Link>

        <Link
          className="bg-red-600 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-red-500 hover:scale-105 hover:shadow-2xl"
          to={`/dashboard/orders/${currentUser?.user?._id}`}
        >
          <ClockCircleOutlined
            style={{ fontSize: "24px", marginRight: "10px" }}
          />
          <p className="text-lg">Pending Orders {} </p>
          <p className="text-sm mt-2">
            Pending Orders: {pendingOrders > 0 ? pendingOrders : "None"}
          </p>
        </Link>
      </div>
      <SystemProfit />
      <BooksAdminDashboard />
      <UserAnalysis />
    </div>
  );
}
