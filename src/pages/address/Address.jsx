import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryAddress } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  // console.log(cartItems);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.user);
  //   setDeliveryAddress
  const [name, setName] = useState(
    cart?.deliveryAddress?.name || currentUser?.user.userName || ""
  );
  const [email, setEmail] = useState(
    cart?.deliveryAddress?.email || currentUser?.user.userEmail || ""
  );
  const [address, setAddress] = useState(cart?.deliveryAddress?.address || "");
  const [phone, setPhone] = useState(cart?.deliveryAddress?.phone || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   console.log(cartItems.length);
  useEffect(() => {
    if (cartItems.length === 0) {
      window.location.href = "/cartItems";
    }
  }, [cartItems]);

  // take the address->save it in redux ->redirect payment page
  // console.log(name, email, address, phone);
  const saveDeliveryAddress = (e) => {
    e.preventDefault();
    dispatch(setDeliveryAddress({ name, email, address, phone }));
    navigate("/payment");
  };
  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Address
      </h1>
      <div>
        <form className="flex flex-col gap-6" onSubmit={saveDeliveryAddress}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full sm:w-1/3 mx-auto rounded-md p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-1/3 mx-auto rounded-md p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <input
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full sm:w-1/3 mx-auto rounded-md p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <input
            type="text"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full sm:w-1/3 mx-auto rounded-md p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <button
            type="submit"
            className="w-full sm:w-1/3 mx-auto p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
