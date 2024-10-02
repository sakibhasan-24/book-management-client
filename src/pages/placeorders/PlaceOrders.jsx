import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useOrders from "../../hooks/orders/useOrders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cart/cartSlice";

export default function PlaceOrders() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   clearCart
  // console.log(cart.cartItems);
  // console.log(cart.deliveryAddress);
  const shippingPrice = cart.cartPrice > 1000 ? 0.0 : cart.cartPrice * 0.02;
  const { loading, error, createOrder } = useOrders();
  const calculateRemainingDays = (returnDate) => {
    const currentDate = new Date();
    const returnDateObj = new Date(returnDate);
    const remainingTime = returnDateObj.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    return remainingDays > 0 ? remainingDays : 0; // Avoid negative days
  };
  const handlePlaceOrder = async () => {
    // console.log("c");
    const res = await createOrder({
      orderItems: cart.cartItems,
      bookOwner: cart.cartItems.map((x) => x.bookOwner),
      bookStatus: cart.cartItems.map((x) => x.bookStatus),
      isAvailable: cart.cartItems.map((x) => x.isAvailable),

      deliveryAddress: cart.deliveryAddress,
      paymentMethod: cart.paymentMethod,
      productPrice: cart.cartPrice,
      shippingPrice,
      totalPrice: cart.cartPrice + shippingPrice,
    });
    // console.log(res.createdOrder);
    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(clearCart());
      navigate(`/order/${res.createdOrder._id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between gap-10">
        {/* Left Section: Shipping, Payment Method, Order Items */}
        <section className="flex-1 space-y-10">
          {/* Shipping Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">
              Shipping
            </h2>
            <p className="text-md text-gray-600">
              <span className="font-bold text-gray-800">Address:</span>{" "}
              {cart.deliveryAddress.address}
            </p>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">
              Payment Method
            </h2>
            <p className="text-md text-gray-600">
              <span className="font-bold text-gray-800">Method:</span>{" "}
              {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">
              Order Items
            </h2>
            {cart?.cartItems.map((item) => (
              <div
                className="flex justify-between items-center py-4 border-b border-gray-200"
                key={item._id}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item?.imagesUrls[0]}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-gray-800 text-md font-semibold underline">
                      {item.title}
                    </p>
                    {item?.orderType === "rent" && (
                      <div>
                        <p className="text-gray-700 text-md font-medium">
                          Rent for{" "}
                          <span className="text-red-500 font-bold">
                            {item.durationDate}
                          </span>
                          days
                        </p>
                        <p className="text-gray-700 text-xs font-medium">
                          Return Date:
                          <span>
                            {new Date(item.returnDate).toDateString()}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-md font-medium">
                  BDT {item.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Right Section: Order Summary */}
        <section className="w-full sm:w-96 bg-white p-6 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg text-gray-800 mb-6 text-center">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Items:</p>
              <p className="font-medium text-gray-800">BDT {cart.cartPrice}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Shipping:</p>
              <p className="font-medium text-gray-800">
                {shippingPrice === 0 ? "Free" : `BDT ${shippingPrice}`}
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <p className="font-semibold text-lg text-gray-800">Total:</p>
              <p className="font-bold text-blue-600 text-lg">
                BDT {shippingPrice + cart.cartPrice}
              </p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Place Order
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
