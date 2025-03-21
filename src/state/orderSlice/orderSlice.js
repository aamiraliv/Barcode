import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

const INITIAL_STATE = {
  orders: [],
  ordersByid: [],
  loadingByid: false,
  status: "idle",
  error: null,
};
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ userId, orderData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`orders/place/${userId}`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`orders/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/allOrder",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ orderId, productId ,userId }, thunkAPI) => {
    try {
      const response = await api.delete(
        `/orders/${orderId}/items/${productId}`
      );
      thunkAPI.dispatch(getOrderById(userId))
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.ordersByid = action.payload;
        state.loadingByid = false;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loadingByid = true;
      });
  },
});

export default orderSlice.reducer;
