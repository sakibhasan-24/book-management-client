import React, { useEffect, useState } from "react";
import useOrders from "../../../hooks/orders/useOrders";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  DollarCircleOutlined,
  MoneyCollectOutlined,
  RiseOutlined,
} from "@ant-design/icons";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const { getAllOrders } = useOrders();
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState(""); // State for messages
  const [isSuccess, setIsSuccess] = useState(false); // State to determine success or warning

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    fetchData();
  }, [getAllOrders]);

  const totalOrders = orders?.orders?.length || 0;
  const pendingOrders = orders?.shippedOrders?.length || 0;
  const pendingPercentage = totalOrders
    ? ((pendingOrders / totalOrders) * 100).toFixed(2)
    : 0;

  const totalEarnings = Number(orders?.adminUser?.totalEarnings) || 0;
  const totalExpense = Number(orders?.adminUser?.expense) || 0;

  const profit = Number(orders?.adminUser?.profits) || 0;

  const profitPercentage =
    totalEarnings !== 0
      ? ((profit / totalEarnings) * 100).toFixed(2)
      : profit < 0 && totalExpense > 0
      ? ((profit / totalExpense) * 100).toFixed(2)
      : "0";

  // Set success or warning messages based on profit
  useEffect(() => {
    if (profit > 0) {
      setMessage("Success! You are making a profit.");
      setIsSuccess(true);
    } else if (profit < 0) {
      setMessage("Warning! You are operating at a loss.");
      setIsSuccess(false);
    } else {
      setMessage("You are breaking even.");
      setIsSuccess(false);
    }
  }, [profit]);

  const chartData = {
    labels: ["Profit", "Expenses"],
    datasets: [
      {
        label: "Profit vs Expenses",
        data: [profit, totalExpense],
        backgroundColor: ["#10B981", "#3B82F6"],
        hoverBackgroundColor: ["#047857", "#1E3A8A"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full sm:max-w-4xl mx-auto p-4">
      {/* Profit and Orders Overview Section */}
      <div className="my-6 bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-slate-700 mb-4">
          Profit Analysis
        </h2>
        <p className="text-2xl font-semibold text-green-600">
          Profits: {profitPercentage}%
        </p>

        {/* Message Display */}
        <div
          className={`my-4 p-4 rounded-lg ${
            isSuccess
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>

        {/* Doughnut Chart Section */}
        <div className="w-48 h-48 mx-auto mt-4">
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Earnings, Expense, and Profit Summary */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-600 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-green-500 hover:scale-105 hover:shadow-2xl flex items-center">
          <DollarCircleOutlined
            style={{ fontSize: "24px", marginRight: "10px" }}
          />
          <div>
            <p className="text-lg">Total Earnings</p>
            <p className="text-sm mt-2">BDT{totalEarnings.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-blue-600 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-2xl flex items-center">
          <MoneyCollectOutlined
            style={{ fontSize: "24px", marginRight: "10px" }}
          />
          <div>
            <p className="text-lg">Total Expense</p>
            <p className="text-sm mt-2">BDT{totalExpense.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-red-600 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-red-500 hover:scale-105 hover:shadow-2xl flex items-center">
          <RiseOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Profit</p>
            <p className="text-sm mt-2">BDT{profit.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
