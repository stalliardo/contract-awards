import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './awardsThunks';
import { generateCoreTotalsData, generateUkCoreTotals } from '../../../utils/financialTotals';
import { TARGET_CATEGORIES } from '../../../utils/constants';

const initialState = {
    data: [],
    coreTotals: [],
    ukCoreTotals: [],
    targets: [], // TODO will be an array filtering by category "contract-awards"
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
      const generatedCoreTotals = generateCoreTotalsData(action.payload.awardsData);
      const generatedUKCoreTotals = generateUkCoreTotals(generatedCoreTotals);

      console.log('awardsData = ', action.payload.awardsData);
      console.log('targetsData = ', action.payload.targetsData);

      const filteredTargets = action.payload.targetsData.filter((target) => target.category === TARGET_CATEGORIES.CONTRACT_AWARDS);

      state.targets = filteredTargets;
      state.coreTotals = generatedCoreTotals;
      state.ukCoreTotals = generatedUKCoreTotals;
      state.loading = false;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, getData } = awardsSlice.actions;

export default awardsSlice.reducer;