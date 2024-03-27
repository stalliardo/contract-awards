import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './awardsThunks';
import { generateCoreTotalsData } from '../../../utils/financialTotals';

const initialState = {
    data: [],
    coreTotals: [],
    loading: true,
    error: null
  };

export const awardsSlice = createSlice({
  name: 'awards',
  initialState,
  reducers: {
    
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const generatedCoreTotals = generateCoreTotalsData(action.payload);

      state.coreTotals = generatedCoreTotals;
      state.loading = false;
    })
  }
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, getData } = awardsSlice.actions;

export default awardsSlice.reducer;