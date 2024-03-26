import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './awardsThunks';
import { generateDataForSummaryTable } from '../../../utils/financialTotals';

const initialState = {
    data: [],
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
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // Do something with the state and the payload
      console.log('action.payload = ', action.payload);

      // will need to generated the reuqired data for the table
      // the object will need to look like 
      const generatedSummayData = generateDataForSummaryTable(action.payload);

      state.data = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, getData } = awardsSlice.actions;

export default awardsSlice.reducer;