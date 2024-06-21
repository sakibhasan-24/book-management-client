import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  errorMsg: null,
  isLoading: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = user.actions;
export default user.reducer;
