import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useUserSignOut from "../../../hooks/user/useUserSignOut";
import Swal from "sweetalert2";
import { signOutSuccess } from "../../../redux/user/user";

const MobileNav = ({ isSidebarOpen, toggleSidebar }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { signOut } = useUserSignOut();

  const handleSignOut = async () => {
    const res = await signOut();
    if (res) {
      dispatch(signOutSuccess(res.data));
      Swal.fire({
        icon: "success",
        title: "Successfully Logged Out",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      className={`fixed z-10 top-0 right-0 w-64 h-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white transform transition-transform duration-500 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={toggleSidebar} className="text-3xl text-gray-100">
          &times;
        </button>
      </div>

      <div className="flex flex-col p-4 space-y-6">
        {currentUser && (
          <p
            className="text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors rounded-lg p-2 cursor-pointer"
            onClick={toggleSidebar}
          >
            {currentUser?.user?.userEmail}
          </p>
        )}

        {currentUser?.user ? (
          <button
            className="text-lg mr-36 font-semibold hover:bg-white hover:text-blue-600 transition-colors rounded-lg p-2"
            onClick={handleSignOut}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/user-credentials/login"
            className="text-lg font-semibold mr-36 hover:bg-white hover:text-blue-600 transition-colors rounded-lg p-2"
            onClick={toggleSidebar}
          >
            Login
          </Link>
        )}

        <Link
          to="/cartItems"
          className="flex items-center text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors rounded-lg p-2"
          onClick={toggleSidebar}
        >
          <FaShoppingCart className="mr-2 text-2xl" />
          Cart
          {cartItems.length > 0 && (
            <span className="ml-2 bg-white text-blue-600 text-xs rounded-full px-2 py-1">
              {cartItems.length}
            </span>
          )}
        </Link>

        {currentUser?.user && currentUser?.user?.role === "admin" && (
          <Link
            to="/dashboard/admin"
            className="text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors rounded-lg p-2"
            onClick={toggleSidebar}
          >
            Dashboard
          </Link>
        )}
        {currentUser?.user && currentUser?.user?.role === "user" && (
          <Link
            to="/dashboard/user"
            className="text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors rounded-lg p-2"
            onClick={toggleSidebar}
          >
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
