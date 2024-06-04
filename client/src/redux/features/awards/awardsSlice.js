import { createSlice } from '@reduxjs/toolkit';
import { addData, deleteItem, editItem, fetchData } from './awardsThunks';
import { generateCoreTotalsData, generateUKTargetTotals, generateUkCoreTotals, generateSpecialTargetTotals, generateCompanyPerformanceCumalitiveTotals } from '../../../utils/financialTotals';
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
  error: null,
  exportData: null
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
    },

    generateExportData: (state, action) => {
      const locations = action.payload;

      const exportData = {
        locations,
        nonSpecialRows: {coreTotals: [], cumalitiveTotals: [], targets: []},
        specialRows: {coreTotals: [], cumalitiveTotals: [], targets: []},
        ukCoreTotalRow: {coreTotals: state.ukCoreTotals, cumalativeTotals: 0, targets: state.ukTargetTotal},
        totalsRow: {coreTotals: state.ukAndSpecialCoreTotals, cumalativeTotals: 0, targets: state.ukAndSpecialTargetTotal},
        companyPerformanceMothlyRow: state.ukAndSpecialCoreTotals.map((total) => total.sum - state.ukAndSpecialTargetTotal),
        companyPerformanceCumalitiveRow: generateCompanyPerformanceCumalitiveTotals(state.ukAndSpecialCoreTotals, state.ukAndSpecialTargetTotal).map((item) => item.sum)
      }

      const cTotals = state.coreTotals; // TODO changeto none mutations
      const targets =  state.targets;

      const cumalativeTotals = [];
      const targetsArray = [];

      locations.forEach((location) => {
        const cumalitiveTotalObject = {location: location.name, cumalitiveTotal: 0};
        const targetObject = {location: location.name, monthTarget: 0, toDate: 0}

        const filteredLocations = cTotals.filter((item) => item.location === location.name);
        
        filteredLocations.forEach((item) => {
          cumalitiveTotalObject.cumalitiveTotal += item.sum;
        })

        targets.forEach((target) => {
          if(target.location === location.name && target.category === "contract-awards"){
            targetObject.monthTarget = target.targetValue
          }
        })

        cumalativeTotals.push(cumalitiveTotalObject);
        targetsArray.push(targetObject);
      })

      let ukCoreTotalsSum = 0;
      state.ukCoreTotals.forEach((total) => {
        ukCoreTotalsSum += total.ukCoreTotal;
      });

      let ukAndSpecialCoreTotalsSum = 0;
      state.ukAndSpecialCoreTotals.forEach((total) => {
        ukAndSpecialCoreTotalsSum += total.sum;
      })

      const nonSpecialCumalitiveTotals = cumalativeTotals.filter((item) => item.location !== "M&E" && item.location !== "Special Projects");
      const nonSpecialTargets = targetsArray.filter((item) => item.location !== "M&E" && item.location !== "Special Projects");
      const nonSpecials = cTotals.filter(item => item.location !== "M&E" && item.location !== "Special Projects");
      
      const specialsCumalitiveTotals = cumalativeTotals.filter((item) => item.location === "M&E" || item.location === "Special Projects");
      const specialTargets = targetsArray.filter((item) => item.location === "M&E" || item.location === "Special Projects");
      const specials = cTotals.filter(item => item.location === "M&E" || item.location === "Special Projects");

      exportData.nonSpecialRows.coreTotals.push(...nonSpecials);
      exportData.nonSpecialRows.cumalitiveTotals.push(...nonSpecialCumalitiveTotals);
      exportData.nonSpecialRows.targets.push(...nonSpecialTargets);
      
      exportData.specialRows.coreTotals.push(...specials);
      exportData.specialRows.cumalitiveTotals.push(...specialsCumalitiveTotals);
      exportData.specialRows.targets.push(...specialTargets); // <- todo
      
      exportData.ukCoreTotalRow.cumalativeTotals = ukCoreTotalsSum;
      exportData.totalsRow.cumalativeTotals = ukAndSpecialCoreTotalsSum;

      state.exportData = exportData;
    },

    clearExportData: (state, action) => {
      state.exportData = null;
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

      const userVisibleTargets = action.payload.targetsData.filter(item => authenticatedUser.locations.some(item2 => item2 === item.location));

      const filteredTargets = userVisibleTargets.filter((target) => target.category === TARGET_CATEGORIES.CONTRACT_AWARDS);

      const filteredTendersSumittedTargets = userVisibleTargets.filter((target) => target.category === TARGET_CATEGORIES.TENDERS_SUBMITTED);
      const formattedLocations = action.payload.locationsData.map((location) => location.name);

      const filteredSpecialLocations = action.payload.locationsData.filter((location) => location.name === "M&E" || location.name === "Special Projects")
      const formattedSpecialTotals = filteredSpecialLocations.map((item) => item.name);

      const generatedUkTargetTotal = generateUKTargetTotals(filteredTargets, authenticatedUser);
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
export const { setLoading, getData, resetState, updateTargets, generateExportData, clearExportData } = awardsSlice.actions;

export default awardsSlice.reducer;