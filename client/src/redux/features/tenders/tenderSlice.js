import { createSlice } from '@reduxjs/toolkit';
import { getTenders } from './tenderThunk';

const initialState = {
  data: [],
  loading: true,
  error: null
};

export const tenderSlice = createSlice({
  name: 'tender',
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getTenders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTenders.fulfilled, (state, action) => {
      // console.log('tenders fullfilled data = ', action.payload);
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getTenders.rejected, (state, action) => {
      state.loading = false;
    });
  }
})

// Action creators are generated for each case reducer function
export const { setLoading } = tenderSlice.actions;

export default tenderSlice.reducer;