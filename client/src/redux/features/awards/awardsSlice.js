import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './awardsThunks';
import { generateCoreTotalsData, generateUkCoreTotals } from '../../../utils/financialTotals';
import { TARGET_CATEGORIES } from '../../../utils/constants';

const initialState = {
  data: [],
  coreTotals: [],
  ukCoreTotals: [],
  targets: [], // TODO will be an array filtering by category "contract-awards"
  locations: [],
  specialLocations: [],
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
      console.log('locations = ', action.payload.locationsData);

      const filteredTargets = action.payload.targetsData.filter((target) => target.category === TARGET_CATEGORIES.CONTRACT_AWARDS);

      const formattedLocations = action.payload.locationsData.map((location) => location.name);
      const filteredSpecialLocations = action.payload.locationsData.filter((location) => location.name === "M&E" || location.name === "Special Projects");


      state.targets = filteredTargets;
      state.coreTotals = generatedCoreTotals;
      state.ukCoreTotals = generatedUKCoreTotals;
      state.locations = formattedLocations;
      state.specialLocations = filteredSpecialLocations;

      console.log('loading called');
      state.loading = false;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, getData } = awardsSlice.actions;

export default awardsSlice.reducer;