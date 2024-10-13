import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  BookOutlined,
  CheckOutlined,
  ShoppingOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import useGetBooks from "../../../hooks/books/useGetBooks";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function BooksAdminDashboard() {
  const { getAllBooks } = useGetBooks();
  const [books, setBooks] = useState([]);
  const [bookStats, setBookStats] = useState({
    totalBooks: 0,
    rentedBooks: 0,
    pendingBooks: 0,
    soldBooks: 0,
    availableBooks: 0,
    availablePercentage: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBooks();
      setBooks(data.books);

      // Calculate stats
      const totalBooks = data.books.length;
      const rentedBooks = data.books.filter(
        (book) => book.bookStatus === "rent"
      ).length;
      console.log(rentedBooks);
      const pendingBooks = data.books.filter((book) => !book.isAccepted).length;
      const soldBooks = data.books.filter(
        (book) => book.bookStatus === "sell"
      ).length;
      const availableBooks =
        totalBooks - (rentedBooks + pendingBooks + soldBooks);
      const availablePercentage = ((availableBooks / totalBooks) * 100).toFixed(
        2
      );

      setBookStats({
        totalBooks,
        rentedBooks,
        pendingBooks,
        soldBooks,
        availableBooks,
        availablePercentage,
      });
    };
    fetchData();
  }, []);

  // Chart data for available books percentage
  const chartData = {
    labels: ["Available Books", "Rented Books", "Pending Books", "Sold Books"],
    datasets: [
      {
        label: "Books Distribution",
        data: [
          bookStats.availableBooks,
          bookStats.rentedBooks,
          bookStats.pendingBooks,
          bookStats.soldBooks,
        ],
        backgroundColor: ["#34D399", "#FBBF24", "#F87171", "#3B82F6"], // Green for Available, Yellow for Rented, Red for Pending, Blue for Sold
        hoverBackgroundColor: ["#059669", "#D97706", "#DC2626", "#2563EB"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full sm:max-w-6xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg my-8 text-center">
        <h2 className="text-xl font-bold text-slate-700 mb-4">
          Books Availability Chart {bookStats.availablePercentage}%
        </h2>
        <div className="w-64 h-64 mx-auto">
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      {/* Book Stats Section */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-green-600 text-white font-bold p-6 rounded-lg shadow-lg flex items-center">
          <BookOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Total Books</p>
            <p className="text-sm mt-2">{bookStats.totalBooks}</p>
          </div>
        </div>

        <div className="bg-yellow-600 text-white font-bold p-6 rounded-lg shadow-lg flex items-center">
          <CheckOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Rented Books</p>
            <p className="text-sm mt-2">{bookStats.rentedBooks}</p>
          </div>
        </div>

        <div className="bg-blue-600 text-white font-bold p-6 rounded-lg shadow-lg flex items-center">
          <ShoppingOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Sold Books</p>
            <p className="text-sm mt-2">{bookStats.soldBooks}</p>
          </div>
        </div>

        <div className="bg-red-600 text-white font-bold p-6 rounded-lg shadow-lg flex items-center">
          <LoadingOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Pending Books</p>
            <p className="text-sm mt-2">{bookStats.pendingBooks}</p>
          </div>
        </div>

        <div className="bg-green-500 text-white font-bold p-6 rounded-lg shadow-lg flex items-center">
          <BookOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Available Books</p>
            <p className="text-sm mt-2">{bookStats.availableBooks}</p>
            <p className="text-sm mt-2">
              ({bookStats.availablePercentage}%)
            </p>{" "}
            {/* Added percentage display */}
          </div>
        </div>
      </div>
    </div>
  );
}
