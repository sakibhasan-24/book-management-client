import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Statistic, Row, Col } from "antd";
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
  }, []);
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getOrdersByUserId(id);
      console.log(res);
      setOrders(res?.orders || []);
    };
    fetchData(currentUser?.user?._id);
  }, []);

  // Fetch books owned by user
  useEffect(() => {
    const fetchBooks = async (id) => {
      const res = await getUserBooks(id);
      setBooks(res?.books || []);
    };
    fetchBooks(currentUser?.user?._id);
  }, []);

  // Fetch currently rented books
  useEffect(() => {
    const fetchRentBooks = async (id) => {
      const res = await getAllRentBooks(id);
      setCurrentlyRentBooks(res?.rentBooks || []);
    };
    fetchRentBooks(currentUser?.user?._id);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {/* User Information */}
      <Card bordered={false} className="mb-6">
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title="User Name"
              value={user?.userName || "N/A"}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Email"
              value={user?.userEmail || "N/A"}
              prefix={<MailOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title=" ID Status"
              value={user?.isRedAlert ? "Blocked" : "Active"}
              valueStyle={{ color: user?.isRedAlert ? "#ff4d4f" : "#52c41a" }}
            />
          </Col>
        </Row>
      </Card>

      {/* Books Statistics */}
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Books"
              value={books.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Books Rented"
              value={currentlyRentBooks.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Books Ordered"
              value={orders.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Earnings"
              value={user?.totalEarnings || 0}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
