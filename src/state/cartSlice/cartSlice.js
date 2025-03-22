import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

const INITIAL_STATE = {
  cartItems: [],
  cartTotal: 0,
  cartSubTotal: 0,
  isLoading: false,
  error: null,
  removeStatus : "idle",
  updateStatus : "idle",
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/products/cart", { params: { userId } });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);


export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post("/products/cart/add", null, {
        params: { userId, productId, quantity },
      });

      dispatch(getCartItems({ userId }));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add item");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.delete("/products/cart/remove", {
        params: { userId, productId },
      });

      dispatch(getCartItems({ userId }));

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.put("products/cart/updateQuantity", null, {
        params: { userId, productId, quantity },
      });

      dispatch(getCartItems({ userId }));

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update quantity");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
        state.cartSubTotal = action.payload.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        state.cartTotal = state.cartSubTotal; 
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.fulfilled, (state) => {
        // const newItem = action.payload;
        // state.cartItems.push(newItem);
        // state.cartSubTotal += newItem.product.price * newItem.quantity;
        state.cartTotal = state.cartSubTotal;
      })

      
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const removedProductId = action.meta.arg.productId;
        state.cartItems = state.cartItems.filter(
          (item) => item.product.id !== removedProductId
        );
        state.cartSubTotal = state.cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        state.cartTotal = state.cartSubTotal;
        state.removeStatus = "success";
      })

      
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.cartItems.findIndex(
          (item) => item.product.id === updatedItem.product.id
        );

        if (index !== -1) {
          state.cartItems[index].quantity = updatedItem.quantity;
        }

        state.cartSubTotal = state.cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        state.cartTotal = state.cartSubTotal;
      });
  },
});

export default cartSlice.reducer;
