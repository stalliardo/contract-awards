import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {

    setLocations: (state, action) => {
      state.data = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },

  extraReducers: (builder) => {
    // builder.addCase(verifyToken.pending, (state, action) => {
    //   state.loading = true;
    // });
 
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, setLocations } = locationSlice.actions;

export default locationSlice.reducer;