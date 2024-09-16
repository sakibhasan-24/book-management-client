import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import useDeliveryMan from "../../hooks/deliveryMan/useDeliveryMan";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../../redux/deliveryman/deliverymanSlice";
import Swal from "sweetalert2";

export default function JoinAsDeliveryMan() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, deliveryManLogin } = useDeliveryMan();
  const { currentlyLogin } = useSelector((state) => state.deliveryMan);
  useEffect(() => {
    if (currentlyLogin) {
      navigate("/deliveryman");
    }
  }, [currentlyLogin]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await deliveryManLogin({ email, password });
      // console.log(res);
      if (res.success) {
        dispatch(loginSuccess(res.deliveryMan));
        Swal.fire({
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/deliveryman");
        });
      }
    } catch (error) {
      console.log(error);
    }
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Delivery Man Login
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-md font-semibold text-slate-700 mt-4">
          Go To
          <Link className="text-blue-600 hover:underline ml-1" to="/">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
