import { createSlice } from '@reduxjs/toolkit';
import { addData, deleteItem, editItem, fetchData } from './awardsThunks';
import { generateCoreTotalsData, generateUKTargetTotals, generateUkCoreTotals, generateSpecialTargetTotals } from '../../../utils/financialTotals';
import { TARGET_CATEGORIES } from '../../../utils/constants';

const initialState = {
  data: [],
  coreTotals: [],
  ukCoreTotals: [],
  specialCoreTotals: [],
  ukTargetTotal: 0,
  specialsTargetTotal: 0,
  ukAndSpecialTargetTotal: 0,
  ukAndSpecialCoreTotals: [],
  targets: [],
  tendersSubmittedTargets: [],
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

    resetState: (state) => {
      return initialState;
    },

    updateTargets: (state, action) => {
      const { category } = action.payload;

      if(category === "contract-awards") {
        const targetIndex = state.targets.findIndex(target => target._id === action.payload._id);

        if (targetIndex > -1) {
        const updatedArray = [...state.targets];
        updatedArray[targetIndex] = action.payload;

        state.targets = updatedArray;
      } else {
        state.targets.push(action.payload);
      }

      } else if( category === "tenders-submitted") {
        const targetIndex = state.tendersSubmittedTargets.findIndex(target => target._id === action.payload._id);

        if (targetIndex > -1) {
        const updatedArray = [...state.tendersSubmittedTargets];
        updatedArray[targetIndex] = action.payload;

        state.tendersSubmittedTargets = updatedArray;
      } else {
        state.tendersSubmittedTargets.push(action.payload);
      }
      }

      const generatedUkTargetTotal = generateUKTargetTotals(state.targets);
      const generatedSpecialTargetTotals = generateSpecialTargetTotals(state.targets);

      state.ukTargetTotal = generatedUkTargetTotal;
      state.specialsTargetTotal = generatedSpecialTargetTotals;
      state.ukAndSpecialTargetTotal = generatedUkTargetTotal + generatedSpecialTargetTotals;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { authenticatedUser } = action.payload;

      const generatedCoreTotals = generateCoreTotalsData(action.payload.awardsData, authenticatedUser);
      const generatedUKCoreTotals = generateUkCoreTotals(generatedCoreTotals);

      const filteredTargets = action.payload.targetsData.filter((target) => target.category === TARGET_CATEGORIES.CONTRACT_AWARDS);
      const filteredTendersSumittedTargets = action.payload.targetsData.filter((target) => target.category === TARGET_CATEGORIES.TENDERS_SUBMITTED);
      const formattedLocations = action.payload.locationsData.map((location) => location.name);

      const filteredSpecialLocations = action.payload.locationsData.filter((location) => location.name === "M&E" || location.name === "Special Projects")
      const formattedSpecialTotals = filteredSpecialLocations.map((item) => item.name);

      const generatedUkTargetTotal = generateUKTargetTotals(filteredTargets);
      const generatedSpecialTargetTotals = generateSpecialTargetTotals(filteredTargets);

      state.targets = filteredTargets;
      state.tendersSubmittedTargets = filteredTendersSumittedTargets;
      state.coreTotals = generatedCoreTotals;
      state.ukCoreTotals = generatedUKCoreTotals.uk;
      state.specialCoreTotals = generatedUKCoreTotals.specials;
      state.ukTargetTotal = generatedUkTargetTotal;
      state.specialsTargetTotal = generatedSpecialTargetTotals;
      state.ukAndSpecialTargetTotal = generatedUkTargetTotal + generatedSpecialTargetTotals;
      state.locations = formattedLocations;
      state.specialLocations = formattedSpecialTotals;

      const monthlyTotals = []

      state.ukCoreTotals.forEach((total, i) => {
        const monthlyTotalsSum = (total.ukCoreTotal + state.specialCoreTotals[i].specialsTotal);
        monthlyTotals.push({ column: total.month, sum: monthlyTotalsSum })
      })

      state.ukAndSpecialCoreTotals = monthlyTotals;
      state.loading = false;
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      const { location, month, core } = action.payload;

      if (state.coreTotals.length) {
        const itemToUpdateIndex = state.coreTotals.findIndex(item => item.location === location && item.month === month);

        if (itemToUpdateIndex > -1) {
          const updatedArray = [...state.coreTotals];
          updatedArray[itemToUpdateIndex].sum += parseInt(core);
          state.coreTotals = updatedArray;

          const generatedUKCoreTotals = generateUkCoreTotals(updatedArray);
          state.ukCoreTotals = generatedUKCoreTotals.uk;
        }
      }
      state.loading = false;
    })

    builder.addCase(editItem.fulfilled, (state, action) => {
      const { location, month, core, previousCoreValue } = action.payload;

      if (state.coreTotals.length) {
        const itemToUpdateIndex = state.coreTotals.findIndex(item => item.location === location && item.month === month);

        if (itemToUpdateIndex > -1) {
          const updatedArray = [...state.coreTotals];

          if (previousCoreValue > core) {
            const difference = parseInt(previousCoreValue) - parseInt(core);

            updatedArray[itemToUpdateIndex].sum -= parseInt(difference);
          } else if (previousCoreValue < core) {
            const difference = parseInt(core) - parseInt(previousCoreValue);

            updatedArray[itemToUpdateIndex].sum += parseInt(difference);
          }
          state.coreTotals = updatedArray;

          const generatedUKCoreTotals = generateUkCoreTotals(updatedArray);
          state.ukCoreTotals = generatedUKCoreTotals.uk;
        }
      }

      state.loading = false;
    })

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      const { location, month, value } = action.payload;

      if (state.coreTotals.length) {
        const itemToUpdateIndex = state.coreTotals.findIndex(item => item.location === location && item.month === month);

        if (itemToUpdateIndex > -1) {
          const updatedArray = [...state.coreTotals];

          updatedArray[itemToUpdateIndex].sum -= parseInt(value);

          state.coreTotals = updatedArray;

          const generatedUKCoreTotals = generateUkCoreTotals(updatedArray);
          state.ukCoreTotals = generatedUKCoreTotals.uk;
        }
      }

      state.loading = false;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, getData, resetState, updateTargets } = awardsSlice.actions;

export default awardsSlice.reducer;