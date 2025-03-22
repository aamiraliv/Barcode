import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";


export const loginUser = createAsyncThunk("user/login", async (_,{rejectedWithValue}) => {
   try {
      const response = await api.get("/users")
      return response.data
   } catch (error) {
      return rejectedWithValue(error.message)
   }
});

const INITIAL_STATE = {
   user: [],
   loading: false,
   error: null,
};

const userSlice = createSlice({
   name: 'user',
   initialState: INITIAL_STATE,
   reducers: {},
   extraReducers: (builder) => {
      builder
      .addCase(loginUser.pending, (state) => {
         state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
         state.loading = false
         state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload
      })
   }
});

export default userSlice.reducer;