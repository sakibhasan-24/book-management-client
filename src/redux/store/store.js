import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../user/user";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/lib/persistStore";
import cartReducer from "../cart/cartSlice";
import deliverymanSlice from "../deliveryman/deliverymanSlice";

const rootReducer = combineReducers({
  user: user,
  cart: cartReducer,
  deliveryMan: deliverymanSlice,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
