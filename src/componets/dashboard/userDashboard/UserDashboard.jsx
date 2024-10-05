import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  UserOutlined,
  MailOutlined,
  BookOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import useGetAllUsers from "../../../hooks/user/useGetAllUsers";
import useGetBooks from "../../../hooks/books/useGetBooks";
import useRentBooks from "../../../hooks/books/useRentBooks";
import useOrders from "../../../hooks/orders/useOrders";

export default function UserDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const { getUserById } = useGetAllUsers();
  const { getUserBooks } = useGetBooks();
  const { getAllRentBooks } = useRentBooks();
  const { getOrdersByUserId } = useOrders([]);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentlyRentBooks, setCurrentlyRentBooks] = useState([]);

  // Fetch user information
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getUserById(id);
      setUser(res?.user);
    };
    fetchData(currentUser?.user?._id);
  }, [currentUser, getUserById]);

  // Fetch orders by user ID
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getOrdersByUserId(id);
      setOrders(res?.orders || []);
    };
    fetchData(currentUser?.user?._id);
  }, [currentUser, getOrdersByUserId]);

  // Fetch books owned by user
  useEffect(() => {
    const fetchBooks = async (id) => {
      const res = await getUserBooks(id);
      setBooks(res?.books || []);
    };
    fetchBooks(currentUser?.user?._id);
  }, [currentUser, getUserBooks]);

  // Fetch currently rented books
  useEffect(() => {
    const fetchRentBooks = async (id) => {
      const res = await getAllRentBooks(id);
      setCurrentlyRentBooks(res?.rentBooks || []);
    };
    fetchRentBooks(currentUser?.user?._id);
  }, [currentUser, getAllRentBooks]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <UserOutlined className="text-lg mr-2" />
          <span className="font-semibold">User Name:</span>
          <span className="ml-2">{user?.userName || "N/A"}</span>
        </div>
        <div className="flex items-center mb-4">
          <MailOutlined className="text-lg mr-2" />
          <span className="font-semibold">Email:</span>
          <span className="ml-2">{user?.userEmail || "N/A"}</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="font-semibold">ID Status:</span>
          <span
            className={`ml-2 ${
              user?.isRedAlert ? "text-red-600" : "text-green-600"
            }`}
          >
            {user?.isRedAlert ? "Blocked" : "Active"}
          </span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg shadow">
          <BookOutlined className="text-lg mb-2" />
          <h3 className="font-semibold">Total Books:</h3>
          <p>{books.length}</p>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <BookOutlined className="text-lg mb-2" />
          <h3 className="font-semibold">Total Books Rented:</h3>
          <p>{currentlyRentBooks.length}</p>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <BookOutlined className="text-lg mb-2" />
          <h3 className="font-semibold">Total Books Ordered:</h3>
          <p>{orders.length}</p>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <DollarOutlined className="text-lg mb-2" />
          <h3 className="font-semibold">Total Earnings:</h3>
          <p>{user?.totalEarnings || 0}</p>
        </div>
      </div>
    </div>
  );
}
