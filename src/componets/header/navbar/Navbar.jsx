import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Card, Dropdown } from "flowbite-react";
import { signOutSuccess } from "../../../redux/user/user";
import useUserSignOut from "../../../hooks/user/useUserSignOut";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import { logout } from "../../../redux/deliveryman/deliverymanSlice";
import useDeliveryMan from "../../../hooks/deliveryMan/useDeliveryMan";
import { BellOutlined, NotificationOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { clearNotice } from "../../../redux/notifications/notificationSlice";

export default function Navbar() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const { notification } = useSelector((state) => state);
  // console.log(notification.fromNowRemainingDays);
  // console.log(currentlyLogin);

  // console.log(cartItems.length);
  // console.log(currentUser);
  const { signOut } = useUserSignOut();
  const { deliveryManLogOut } = useDeliveryMan();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRoute = (route) => {
    if (location.pathname === route) {
      return true;
    }
    return false;
  };
  //   const [isOpen, setIsOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = async () => {
    const res = await signOut();
    if (res) {
      dispatch(signOutSuccess(res.data));
      dispatch(clearNotice());
      Swal.fire({
        icon: "success",
        title: "Successfully Logout",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleShow = () => {
    navigate("/dashboard/rentBooks");
  };
  return (
    <div className={`${handleRoute("/deliveryMan-login") && "hidden"}`}>
      {/* for desktop */}
      <div className="flex flex-row items-center justify-between gap-8 p-4 md:px-8 lg:px-12  ">
        <div>
          <Link to="" className="text-2xl font-semibold text-slate-600">
            Book
            <span className="text-blue-500 text-3xl font-bold">
              Exchange
            </span>{" "}
          </Link>
        </div>
        {currentUser?.user?.role === "user" &&
          notification &&
          notification.numberOfBooks > 0 && (
            <div
              title={notification?.notice}
              className={`${
                location.pathname === "/dashboard/rentBooks" && "hidden"
              }`}
            >
              <Space>
                <Badge dot style={{ backgroundColor: "#fff" }}>
                  <div
                    onClick={handleShow}
                    className="relative cursor-pointer flex items-center"
                  >
                    <NotificationOutlined
                      style={{ fontSize: 24, color: "#1890ff" }}
                    />
                    <span className="absolute -top-2 -right-2 text-xs font-bold text-white bg-red-500 rounded-full px-1">
                      1
                    </span>
                  </div>
                </Badge>
              </Space>
            </div>
          )}
        <div className="hidden sm:flex items-center justify-center gap-4 mr-12 text-md font-bold text-slate-600">
          {/* if user login then do here logout */}
          {cartItems.length > 0 && (
            <div className="relative hover:bg-slate-200  rounded-md">
              <Link to="/cartItems">
                <FaShoppingCart className="text-2xl font-bold text-slate-600" />
                <p className="absolute -top-2 left-4 rounded-full bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center p-2">
                  {cartItems.length}
                </p>
              </Link>
            </div>
          )}
          {currentUser?.user ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="img" img={currentUser?.user?.image} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    {currentUser?.user?.userName}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {currentUser?.user?.userEmail}
                  </span>
                </Dropdown.Header>
                {currentUser?.user?.role === "admin" && (
                  <Link to="/dashboard/admin">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                )}
                {currentUser?.user?.role === "user" && (
                  <Link to="/dashboard/user">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                )}

                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
              </Dropdown>
              {/* <Link
                to="/user-credentials/login"
                className={`
           ${handleRoute("/user-credentials/login") && "underline "}
          `}
              >
                Logout
              </Link> */}
            </>
          ) : (
            <Link
              to="/user-credentials/login"
              className={`
             ${handleRoute("/user-credentials/login") && "underline "}
            `}
            >
              Login
            </Link>
          )}
        </div>
        {/* start of mobile view */}

        <div
          className={`flex  justify-between sm:hidden bg-slate-300 rounded-full p-2 `}
        >
          <div className="sm:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <MobileNav
            className={`transform  transition-transform duration-700 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </div>
    </div>
  );
}
