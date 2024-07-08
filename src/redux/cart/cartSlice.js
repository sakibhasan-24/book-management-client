import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(action.payload);
      const item = action.payload;
      const exist = state.cartItems.find((newItem) => newItem._id === item._id);
      if (exist) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.cartPrice = Number(
        state.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)
      );

      localStorage.setItem("cart", JSON.stringify(state));
      //   const exist = state.cartItem.find((it) => it._id === item._id);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.cartPrice = Number(
        state.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
