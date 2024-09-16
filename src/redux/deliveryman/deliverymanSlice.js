import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentlyLogin: null,
  loading: false,
  errors: null,
};

const deliveryManSlice = createSlice({
  name: "deliveryman",
  initialState,
  reducers: {
    // login
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentlyLogin = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    // logout
    logout: (state) => {
      state.currentlyLogin = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  deliveryManSlice.actions;

export default deliveryManSlice.reducer;
