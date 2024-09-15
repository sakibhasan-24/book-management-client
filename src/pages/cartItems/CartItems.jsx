import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cart/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../componets/loader/Spinner";

export default function CartItems() {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const dispatch = useDispatch();
  //   removeFromCart
  if (cartItems.length === 0) return <Spinner />;
  return (
    <div className="w-full sm:max-w-3xl mx-auto my-6  ">
      <h1 className="text-slate-800 text-2xl text-center font-bold ">
        You Add {cartItems.length} Book To Cart
      </h1>
      {cartItems.length < 1 && (
        <div className="text-slate-800 text-2xl text-center font-bold ">
          No Items In Cart
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        <div>
          {cartItems.map((book) => (
            <div
              key={book?._id}
              className="flex  gap-4 items-center my-2 shadow-md shadow-slate-200 p-2 rounded-md"
            >
              <div>
                <img
                  src={book?.imagesUrls[0]}
                  className="w-28 h-28 object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                <p className="text-xl font-bold text-slate-800 underline">
                  {book?.title}
                </p>
                <p>{book?.price}BDT</p>
              </div>
              <div>
                <button onClick={() => dispatch(removeFromCart(book._id))}>
                  <FaTrashAlt className="text-red-300 hover:text-red-800" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          {cartItems.length > 0 && (
            <div className="text-slate-800 text-2xl text-center font-bold ">
              <h1>
                {" "}
                Total Price:{" "}
                {cartItems.reduce((acc, book) => acc + book.price, 0)}
                <span className="text-md font-semibold">BDT</span>
              </h1>
              <Link to="/address">
                <button className="bg-blue-500 text-slate-200 font-semibold  text-xs px-2 py-1 rounded-md hover:bg-blue-800">
                  Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
