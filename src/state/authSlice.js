import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const INITIAL_STATE = {
  users: [],
  usersError: null,
  usersLoading: false,

  isAuth: false,
  userDetails: null,
  userDetailsLoding: false,
  loggeduser: null,
  userLoading: false,
  userError: null,
  token: null,
  error: null,
  loading: false,

  isAdmin: false,
  isAdminLogged: false,
  isAdminError: null,
  isAdminLoading: false,
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
      thunkAPI.dispatch(getCurrentUser());
      return response.data;
    } catch (error) {
      console.log("API Error Response:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const adminLogin = createAsyncThunk(
  "auth/Adminlogin",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/admin-login", credentials);
      thunkAPI.dispatch(getCurrentUser());
      return response.data;
    } catch (error) {
      console.log("API Error Response:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/refresh-token");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Refresh failed");
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
  async (userId, thunkAPI) => {
    try {
      const response = await api.put(`/admin/users/block/${userId}`, null, {
        withCredentials: true,
      });
      thunkAPI.dispatch(getAllUsers());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unBlockUser = createAsyncThunk(
  "auth/unBlockUser",
  async (userId, thunkAPI) => {
    try {
      const response = await api.put(`/admin/users/unblock/${userId}`);
      thunkAPI.dispatch(getAllUsers());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.token = action.payload.accessToken;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = state.error || "Invalid credentials";
        state.isAuth = false;
        state.token = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isAuth = false;
        state.token = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        state.isAuth = true;
        state.isAdminLogged = true;
        state.token = action.payload.accessToken;
        state.isAdminError = null;
        state.isAdminLoading = false;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdminError = action.payload || "Invalid credentials";
        state.isAdmin = false;
        state.isAdminLogged = false;
        state.isAuth = false;
        state.token = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.isAuth = false;
        state.token = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loggeduser = action.payload;
        state.userError = null;
        state.userLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.userError = state.error || "user not found";
        state.isAuth = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.userDetailsLoding = false;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.userDetailsLoding = true;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetails = null;
        state.userError = action.payload || "Failed to fetch user details";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersError = null;
        state.usersLoading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.usersError = action.payload;
        state.usersLoading = false;
      });
  },
});
// export const { logout } = authSlice.actions;
export default authSlice.reducer;
