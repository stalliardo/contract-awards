import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './awardsThunks';
import { generateCoreTotalsData } from '../../../utils/financialTotals';

const initialState = {
    data: [],
    coreTotals: [],
    loading: false,
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

    builder.addCase(fetchData.pending, (state) => {
      console.log('pending called');
      state.loading = true;
    })

    builder.addCase(fetchData.fulfilled, (state, action) => {
      // Do something with the state and the payload
      // console.log('action.payload = ', action.payload);

      // will need to generated the reuqired data for the table
      // the object will need to look like 
      const generatedCoreTotals = generateCoreTotalsData(action.payload);

      state.coreTotals = generatedCoreTotals;
    })
  }
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, getData } = awardsSlice.actions;

export default awardsSlice.reducer;