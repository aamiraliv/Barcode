import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import productReducer from "./productSlice/productSlice";
import cartReducer from "./cartSlice/cartSlice";
import orderReducer from "./orderSlice/orderSlice";
import wishlistReducer from "../state/wishlistSlice";
import authReducer from "../state/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAdmin"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
