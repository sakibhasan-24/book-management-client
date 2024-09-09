import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const [paymentMethod, setPaymentMethod] = useState(""); // Initially no selection
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);
  const { deliveryAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!deliveryAddress) {
      navigate("/address");
    }
  }, [deliveryAddress, navigate]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentMethodSave = async (e) => {
    e.preventDefault();
    // Save payment method logic here
  };

  return (
    <div className="w-full p-6 sm:max-w-md sm:p-8 mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Choose Payment Method
      </h1>
      <form
        className="bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6"
        onSubmit={handlePaymentMethodSave}
      >
        {/* SSLCommerze */}
        <label className="flex items-center space-x-4 bg-blue-50 p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-blue-500">
          <span className="relative">
            <input
              type="radio"
              name="payment"
              value="SSL"
              checked={paymentMethod === "SSL"}
              onChange={handlePaymentChange}
              className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full transition duration-300 checked:bg-blue-600"
            />
            <span
              className={`checkmark absolute inset-0 flex items-center justify-center bg-blue-600 rounded-full transition-transform duration-300 ${
                paymentMethod === "SSL"
                  ? "opacity-100 scale-50"
                  : "opacity-0 scale-0"
              }`}
            >
              <span className="bg-white w-2 h-2 rounded-full"></span>
            </span>
          </span>
          <span className="text-gray-600 text-lg font-semibold">
            SSLCommerze
          </span>
        </label>

        {/* PayPal - Disabled */}
        <label className="flex items-center space-x-4 bg-gray-100 p-4 rounded-xl cursor-not-allowed border-2 border-gray-200">
          <span className="relative">
            <input
              type="radio"
              name="payment"
              value="PayPal"
              disabled
              className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-600 cursor-not-allowed"
            />
          </span>
          <span className="text-gray-400 text-lg font-semibold">
            PayPal (Coming Soon)
          </span>
        </label>

        {/* Stripe - Disabled */}
        <label className="flex items-center space-x-4 bg-gray-100 p-4 rounded-xl cursor-not-allowed border-2 border-gray-200">
          <span className="relative">
            <input
              type="radio"
              name="payment"
              value="Stripe"
              disabled
              className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-600 cursor-not-allowed"
            />
          </span>
          <span className="text-gray-400 text-lg font-semibold">
            Stripe (Coming Soon)
          </span>
        </label>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
