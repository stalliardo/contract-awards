import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './awardsThunks';
import { generateCoreTotalsData, generateUkCoreTotals } from '../../../utils/financialTotals';

const initialState = {
    data: [],
    coreTotals: [],
    ukCoreTotals: [],
    loading: true,
    error: null
  };

export const awardsSlice = createSlice({
  name: 'awards',
  initialState,
  reducers: {
    
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const generatedCoreTotals = generateCoreTotalsData(action.payload);
      const generatedUKCoreTotals = generateUkCoreTotals(generatedCoreTotals);

      state.coreTotals = generatedCoreTotals;
      state.ukCoreTotals = generatedUKCoreTotals;
      state.loading = false;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, getData } = awardsSlice.actions;

export default awardsSlice.reducer;