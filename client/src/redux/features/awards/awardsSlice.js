import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './awardsThunks';
import { generateCoreTotalsData, generateSpecialsTotals, generateUkCoreTotals, generateTargetTotals } from '../../../utils/financialTotals';
import { TARGET_CATEGORIES } from '../../../utils/constants';

const initialState = {
  data: [],
  coreTotals: [],
  ukCoreTotals: [],
  monthlyTargetTotal: 0,
  targets: [],
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

      const filteredTargets = action.payload.targetsData.filter((target) => target.category === TARGET_CATEGORIES.CONTRACT_AWARDS);
      const formattedLocations = action.payload.locationsData.map((location) => location.name);
      const filteredSpecialLocations = action.payload.locationsData.filter((location) => location.name === "M&E" || location.name === "Special Projects")
      const formattedSpecialTotals = filteredSpecialLocations.map((item) => item.name); 

      const generatedTargetMonthlyTotal = generateTargetTotals(filteredTargets);

      state.targets = filteredTargets;
      state.coreTotals = generatedCoreTotals;
      state.ukCoreTotals = generatedUKCoreTotals.uk;
      state.monthlyTargetTotal = generatedTargetMonthlyTotal;
      state.locations = formattedLocations;
      state.specialLocations = formattedSpecialTotals;

      state.loading = false;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, getData } = awardsSlice.actions;

export default awardsSlice.reducer;