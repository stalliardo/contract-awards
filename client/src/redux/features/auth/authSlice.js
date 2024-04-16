import { createSlice } from '@reduxjs/toolkit';
import { verifyToken } from './authThunk';

const initialState = {
  data: [],

  loading: true,
  isAuthenticated: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(verifyToken.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(verifyToken.rejected, (state, action) => {
      const status = action.payload;
      state.loading = false;
    });
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;