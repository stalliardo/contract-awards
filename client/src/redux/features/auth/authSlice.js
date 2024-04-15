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
    }
  },

  extraReducers: (builder) => {
    builder.addCase(verifyToken.pending, (state, action) => {
      console.log('pending called');
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      console.log('fulfilled called + action.payload = ', action.payload);
      const { data, status } = action.payload;

      // TODO - good place to check for expired status code

    });

    builder.addCase(verifyToken.rejected, (state, action) => {
      const { status } = action.payload;


      switch (status) {
        case 200: {

          break;
        }
        case 401: {
          console.log('401 called in switch????');

          // navigate("/auth");
          // Access denied no token
          break;

        }
        case 403: {
          console.log('403 called in switch??????');
          // invalid token
          // navigate("/auth");
          break;

        }
        default: {
          // navigate("/auth");
          console.log('def called');
        }
      }

    });
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;