import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

const INITIAL_STATE = {
  products: [],
  loading: false,
  error: null,

  mostSoldProducts: [],
  mostSoldLoading: false,
  mostSoldError: null,

  productById: {},
  loadingById: false,
  errorById: null,

  searchResults: [],
  errorSearch: null,
  loadingSearch: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "productById/getProductById",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const mostSellingProducts = createAsyncThunk(
  "mostSoldProducts/mostSellingProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/products/mostSelling");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async ({ name, category }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (category) params.append("category", category);

      const { data } = await api.get(`/products/search?${params.toString()}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

// export const getProductsByCategory = createAsyncThunk(
//   "productsByCategory/getProductsByCategory",
//   async (category, { rejectWithValue }) => {
//     try {
//       const { data } = await api.get(`/products/${category}`);
//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data.message : error.message
//       );
//     }
//   }
// );

const productSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(mostSellingProducts.fulfilled, (state, action) => {
        state.mostSoldLoading = false;
        state.mostSoldError = null;
        state.mostSoldProducts = action.payload;
      })
      .addCase(mostSellingProducts.rejected, (state, action) => {
        state.mostSoldError = action.payload;
      })
      .addCase(mostSellingProducts.pending, (state) => {
        state.mostSoldLoading = true;
      })
      // .addCase(getProductsByCategory.pending, (state) => {
      //   state.categoryLoading = true;
      // })
      // .addCase(getProductsByCategory.fulfilled, (state, action) => {
      //   state.categoryLoading = false;
      //   state.productsByCategory = action.payload;
      // })
      // .addCase(getProductsByCategory.rejected, (state, action) => {
      //   state.categoryLoading = true;
      //   state.categoryError = action.payload;
      // })
      .addCase(getProductById.pending, (state) => {
        state.loadingById = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.productById = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loadingById = true;
        state.errorById = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loadingSearch = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadingSearch = false;
        state.errorSearch = action.payload;
      });
  },
});

export default productSlice.reducer;
