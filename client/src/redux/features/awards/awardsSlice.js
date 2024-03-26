import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './awardsThunks';

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

    getData: (state, action) => {
      console.log('get data caleld');
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // Do something with the state and the payload
      console.log('action.payload = ', action.payload);
    })
  }
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, getData } = awardsSlice.actions;

export default awardsSlice.reducer;