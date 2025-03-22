import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const INITIAL_STATE = {
  wishlistByUser: [],
  isLoading: false,
  isError: null,
};

export const getWishlistItems = createAsyncThunk(
  "wishlist/getWishlisItem",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/wishlist/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "wishlist/addToWishList",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const response = await api.post(`/products/wishlist/add`, null, {
        params: {
          userId: userId,
          productId: productId,
        },
      });
      thunkAPI.dispatch(getWishlistItems(userId));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const response = await api.delete(`/products/wishlist/delete`, {
        params: {
          userId: userId,
          productId: productId,
        },
      });
      thunkAPI.dispatch(getWishlistItems(userId));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistItems.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistByUser = action.payload;
      })
      .addCase(getWishlistItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
