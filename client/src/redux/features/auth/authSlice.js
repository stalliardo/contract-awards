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
      
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {

    });

    builder.addCase(verifyToken.rejected, (state, action) => {
      const status = action.payload;
    });
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;