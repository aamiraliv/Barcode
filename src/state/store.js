import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import productReducer from "./productSlice/productSlice";
import authReducer from "../state/authSlice";
import cartReducer from "./cartSlice/cartSlice";
import orderReducer from "./orderSlice/orderSlice";
import wishlistReducer from "../state/wishlistSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
  },
});

// const rootReducer = combineReducers({
//   user: userReducer,
//   product: productReducer,
//   auth: authReducer,
//   cart: cartReducer,
//   order: orderReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart"], // Persist only cart state
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);
