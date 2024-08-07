import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { signOutSuccess } from "../../../redux/user/user";
import useUserSignOut from "../../../hooks/user/useUserSignOut";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems.length);
  // console.log(currentUser);
  const { signOut } = useUserSignOut();
  const dispatch = useDispatch();
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
      Swal.fire({
        icon: "success",
        title: "Successfully Logout",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-4 bg-slate-100 ">
      {/* for desktop */}
      <div className="flex flex-row items-center justify-between gap-8 ">
        <div>
          <Link to="" className="text-2xl font-semibold text-slate-600">
            Book
            <span className="text-blue-500 text-3xl font-bold">
              Exchange
            </span>{" "}
          </Link>
        </div>
        <div className="hidden sm:flex items-center justify-center gap-4 mr-12 text-md font-bold text-slate-600">
          {/* <Link
            to="/add-books"
            className={`${handleRoute("/add-books") && "underline "}`}
          >
            Add Books
          </Link> */}
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
                <Link to="/dashboard/profile">
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>

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
          <MobileNav
            className={`transform  transition-transform duration-700 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        {/* end of mobile view */}
      </div>
      {/* end of desktop */}
    </div>
  );
}
