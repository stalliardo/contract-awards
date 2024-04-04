import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../users/usersThunk';

const initialState = {
    data: [],
    
    loading: true,
    error: null
  };

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // const generatedCoreTotals = generateCoreTotalsData(action.payload);
      // const generatedUKCoreTotals = generateUkCoreTotals(generatedCoreTotals);

      console.log('Fulfilled caalled + action.payload', action.payload);
      state.data = action.payload;
      state.loading = false;

      // state.coreTotals = generatedCoreTotals;
      // state.ukCoreTotals = generatedUKCoreTotals;
      // state.loading = false;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setLoading } = usersSlice.actions;

export default usersSlice.reducer;