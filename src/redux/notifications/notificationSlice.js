import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fromNowRemainingDays: 0,
  notice: "",
  numberOfBooks: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotice: (state, action) => {
      state.notice = action.payload;
    },
    setFromNowRemainingDays: (state, action) => {
      state.fromNowRemainingDays = action.payload;
    },
    setNumberOfBooks: (state, action) => {
      state.numberOfBooks = action.payload;
    },
    clearNotice: (state) => {
      state.notice = "";
      state.fromNowRemainingDays = 0;
      state.numberOfBooks = 0;
    },
  },
});

export const {
  setNotice,
  setFromNowRemainingDays,
  clearNotice,
  setNumberOfBooks,
} = notificationSlice.actions;
export default notificationSlice.reducer;
