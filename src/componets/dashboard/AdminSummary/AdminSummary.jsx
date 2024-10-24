import React, { useEffect, useState } from "react";
import useApiCall from "../../../apicall/publicApi/useApiCall";
import { Line } from "react-chartjs-2"; // Importing Chart.js for charting
import "chart.js/auto"; // For automatic registration of Chart.js components
import { PDFDownloadLink } from "@react-pdf/renderer";
import SummaryPdf from "./SummaryPdf";
// import SummaryPDF from "./SummaryPDF";

export default function AdminSummary() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    currentMonthOrders: 0,
    lastMonthOrders: 0,
    orderChange: 0,
    totalUsers: 0,
    currentMonthUsers: 0,
    lastMonthUsers: 0,
    userChange: 0,
    totalBooks: 0,
    currentMonthBooks: 0,
    lastMonthBooks: 0,
    bookChange: 0,
    adminProfit: 0,
    totalUsersCount: 0,
    totalDeliveryMen: 0,
    blockedUserCount: 0,
    totalExpenses: 0,
    totalEarnings: 0,
  });

  const axiosPublic = useApiCall();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/api/user/getSystem");
        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  // Data for the line chart
  const chartData = {
    labels: ["Current Month", "Last Month"],
    datasets: [
      {
        label: "Orders",
        data: [summary.currentMonthOrders, summary.lastMonthOrders],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Users",
        data: [summary.currentMonthUsers, summary.lastMonthUsers],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
      {
        label: "Books Added",
        data: [summary.currentMonthBooks, summary.lastMonthBooks],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
      {
        label: "Monthly Profit",
        data: [
          summary.adminProfit,
          summary.adminProfit - summary.totalExpenses,
        ],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Admin Dashboard Summary
      </h1>

      {/* Line chart to visualize trends */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Monthly Analysis
        </h2>
        <Line data={chartData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SummaryCard
          title="Total Orders"
          lastMonth={summary.lastMonthOrders}
          currentMonth={summary.currentMonthOrders}
          growthRate={summary.orderChange}
        />
        <SummaryCard
          title="New Users"
          lastMonth={summary.lastMonthUsers}
          currentMonth={summary.currentMonthUsers}
          growthRate={summary.userChange}
        />
        <SummaryCard
          title="Books Added"
          lastMonth={summary.lastMonthBooks}
          currentMonth={summary.currentMonthBooks}
          growthRate={summary.bookChange}
        />
        <SummaryCard
          title="Monthly Profit"
          lastMonth={`$${summary.adminProfit - summary.totalExpenses}`}
          currentMonth={`$${summary.adminProfit}`}
          growthRate={
            summary.adminProfit
              ? (
                  ((summary.adminProfit - summary.totalExpenses) /
                    summary.adminProfit) *
                  100
                ).toFixed(2)
              : 0
          }
        />
        <SummaryCard
          title="Total Registered Users"
          value={summary.totalUsers}
        />
        <SummaryCard
          title="Delivery Personnel"
          value={summary.totalDeliveryMen}
        />
        <SummaryCard title="Blocked Users" value={summary.blockedUserCount} />
        <SummaryCard
          title="Total Expenses"
          value={`$${summary.totalExpenses}`}
        />
        <SummaryCard
          title="Total Earnings"
          value={`$${summary.totalEarnings}`}
        />
      </div>

      {/* Download PDF Button */}
      <div className="mt-10 text-center">
        <PDFDownloadLink
          document={<SummaryPdf summary={summary} />}
          fileName="admin_summary.pdf"
        >
          {({ loading }) => (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Preparing PDF..." : "Download PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

const SummaryCard = ({ title, lastMonth, currentMonth, growthRate, value }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
      {lastMonth !== undefined && (
        <p className="mb-1 text-gray-600">Last Month: {lastMonth}</p>
      )}
      {currentMonth !== undefined && (
        <p className="mb-1 text-gray-600">Current Month: {currentMonth}</p>
      )}
      {growthRate !== undefined &&
        typeof growthRate === "number" &&
        !isNaN(growthRate) && (
          <p className={growthRate > 0 ? "text-green-600" : "text-red-600"}>
            Growth Rate: {growthRate.toFixed(2)}%
          </p>
        )}
      {value !== undefined && (
        <p className="text-lg font-bold text-gray-800">{value}</p>
      )}
    </div>
  );
};
