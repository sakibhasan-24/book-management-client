import React, { useEffect, useState } from "react";
import useOrders from "../../../hooks/orders/useOrders";
import {
  UserOutlined,
  CarOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import useRentBooks from "../../../hooks/books/useRentBooks";
import { useSelector } from "react-redux";
export default function UserAnalysis() {
  const [users, setUsers] = useState([]);
  const [overDueUsers, setOverDueUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const { getAllOrders } = useOrders();
  const { getAllOverDueUsers } = useRentBooks();
  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders();
      setUsers(orders.allUsers);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const overDueUsers = await getAllOverDueUsers(currentUser?.user?._id);
      setOverDueUsers(overDueUsers);
    };
    fetchData();
  }, []);

  const basicUsers = users?.filter((user) => user.role === "user");
  const deliveryMan = users?.filter((user) => user.role === "deliveryMan");
  const blockedUser = users?.filter((user) => user.isRedAlert);
  return (
    <div className="w-full sm:max-w-4xl mx-auto p-4">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-slate-700 mb-6 text-center">
        User Analysis
      </h2>

      {/* User Analysis Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Users Card */}
        <div className="bg-blue-500 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-blue-400 hover:scale-105 hover:shadow-2xl flex items-center">
          <UserOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Basic Users</p>
            <p className="text-2xl mt-2">{basicUsers?.length}</p>
          </div>
        </div>

        {/* Delivery Men Card */}
        <div className="bg-green-500 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-green-400 hover:scale-105 hover:shadow-2xl flex items-center">
          <CarOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Delivery Men</p>
            <p className="text-2xl mt-2">{deliveryMan?.length}</p>
          </div>
        </div>

        {/* Blocked Users Card */}
        <div className="bg-red-500 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-red-400 hover:scale-105 hover:shadow-2xl flex items-center">
          <StopOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <div>
            <p className="text-lg">Blocked Users</p>
            <p className="text-2xl mt-2">{blockedUser?.length}</p>
          </div>
        </div>
        {overDueUsers.length > 0 && (
          <div className="bg-orange-500 text-white font-bold p-6 rounded-lg shadow-lg transform transition duration-300 hover:bg-orange-400 hover:scale-105 hover:shadow-2xl flex items-center">
            <div>
              <ExclamationCircleOutlined
                style={{ fontSize: "24px", color: "red" }}
              />
              <p className="text-lg">Blocked Users</p>
              <p className="text-2xl mt-2">{blockedUser?.length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
