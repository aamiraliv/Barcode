import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const INITIAL_STATE = {
  users : [],
  usersError : null,
  usersLoading : false,
  user: null,
  userDetails: null,
  loggeduser: null,
  userLoading: false,
  userError: null,
  token: null,
  error: null,
  loading: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.log("API Error Response:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/auth/current-user");
      thunkAPI.dispatch(getUserDetails(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/user/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const getAllUsers = createAsyncThunk(
  "products/getAllUsers",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await api.get("/admin/users");
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const blockUser = createAsyncThunk(
  "auth/blockUser",
  async(userId,thunkAPI)=>{
    try {
      const response = await api.put(`/admin/users/block/${userId}`);
      thunkAPI.dispatch(getAllUsers())
      return response.data;
    }catch(error){
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const unBlockUser = createAsyncThunk(
  "auth/unBlockUser",
  async(userId,thunkAPI)=>{
    try {
      const response = await api.put(`/admin/users/unblock/${userId}`);
      thunkAPI.dispatch(getAllUsers())
      return response.data;
    }catch(error){
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.email;
        state.token = action.payload.token;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = state.error || "Invalid credentials";
        state.user = null;
        state.token = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.token = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loggeduser = action.payload;
        state.userError = null;
        state.userLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.userError = state.error || "user not found";
        state.user = null;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetails = null;
        state.userError = action.payload || "Failed to fetch user details";
      })
      .addCase(getAllUsers.fulfilled, (state ,action)=>{
        state.users = action.payload;
        state.usersError = null;
        state.usersLoading = false;
      })
      .addCase(getAllUsers.pending,(state)=>{
        state.usersLoading = true;
      })
      .addCase(getAllUsers.rejected,(state,action)=>{
        state.usersError = action.payload;
        state.usersLoading = false;
      })
  },
});
// export const { logout } = authSlice.actions;
export default authSlice.reducer;
