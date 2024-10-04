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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    fetchData();
  }, []);

  // Calculate total and pending orders percentage
  const totalOrders = orders?.orders?.length || 0;
  const pendingOrders = orders?.shippedOrders?.length || 0;
  const pendingPercentage = totalOrders
    ? ((pendingOrders / totalOrders) * 100).toFixed(2)
    : 0;

  // Calculate profit percentage
  const totalEarnings = Number(orders?.adminUser?.totalEarnings) || 0;
  const totalExpense = Number(orders?.adminUser?.expense) || 0;
  const profit = totalEarnings - totalExpense;
  const profitPercentage =
    totalEarnings > 0 ? ((profit / totalEarnings) * 100).toFixed(2) : 0;

  // Chart data for pending orders
  const chartData = {
    labels: ["Profit", "Expenses"], // Change labels to Profit and Expenses
    datasets: [
      {
        label: "Profit vs Expenses",
        data: [profit, totalExpense], // Data should represent profit and expenses
        backgroundColor: ["#10B981", "#3B82F6"], // Green for Profit, Blue for Expenses
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
            <p className="text-sm mt-2">${totalEarnings.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-blue-600 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-2xl flex items-center">
          <MoneyCollectOutlined
            style={{ fontSize: "24px", marginRight: "10px" }}
          />
          <div>
            <p className="text-lg">Total Expense</p>
            <p className="text-sm mt-2">${totalExpense.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-red-600 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-red-500 hover:scale-105 hover:shadow-2xl flex items-center">
          <RiseOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Profit</p>
            <p className="text-sm mt-2">${profit.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
