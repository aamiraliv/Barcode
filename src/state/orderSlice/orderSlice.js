import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

const INITIAL_STATE = {
  orders: [],
  ordersError: null,
  ordersLoading: false,
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
  async ({ orderId, productId, userId }, thunkAPI) => {
    try {
      const response = await api.delete(
        `/orders/${orderId}/items/${productId}`
      );
      thunkAPI.dispatch(getOrderById(userId));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}`, null, {
        params: { status: status },
      });
      thunkAPI.dispatch(getAllOrders());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDeliveryStatus = createAsyncThunk(
  "order/updateDeliveryStatus",
  async ({ orderId, productId, status }, thunkAPI) => {
    try {
      const response = await api.put(
        `/admin/orders/${orderId}/update-status/${productId}`,
        null,
        {
          params: { status: status },
        }
      );
      thunkAPI.dispatch(getAllOrders());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/orders");
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
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersLoading = false;
        state.ordersError = null;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      });
  },
});

export default orderSlice.reducer;
