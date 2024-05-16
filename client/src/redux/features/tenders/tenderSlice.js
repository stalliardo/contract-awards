import { createSlice } from '@reduxjs/toolkit';
import { addTender, getTenders } from './tenderThunk';
import { generateCumalitiveTenderTotals, generateSpecialCumalitiveTotals, generateTargetAcheivedPercentage, generateTargetAmountToDate, generateUKTenendersCumaltiveTotal, generateUkCoreTenderTotals } from '../../../utils/financialTotals';

const initialState = {
  data: [],
  loading: true,
  error: null,
  cumalitiveTotals: [],
  ukCumalitiveTotal: "",
  ukCoreTotals: [], // ie, the total for each month
  specialCumalitiveTotals: "",
  exportData: null
};

export const tenderSlice = createSlice({
  name: 'tender',
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthenticatedUser: (state, action) => {
      state.authenticatedUser = action.payload;
    },
    resetTenderState: () => {
      return initialState;
    },
    generateExportData: (state, action) => {
      const locations = action.payload.locations;
      const targets = action.payload.targets;
      const eData = [];

      locations.forEach((location) => {
        const dataItem = state.data.find(item => item.location === location.name);
        const cumalativeTotal = state.cumalitiveTotals.find(item => item.location === location.name);
        const target = parseInt(targets.find(target => target.location === location.name)?.targetValue) || 0;
        const yearlyTarget = target * 12;
        const targetToDate = Math.round(generateTargetAmountToDate(yearlyTarget, cumalativeTotal));
        let targetAcheived = generateTargetAcheivedPercentage(yearlyTarget, cumalativeTotal);

        if(isNaN(targetAcheived)) {
          targetAcheived = 0;
        }

        eData.push({location: location.name, items: [...dataItem.items], cumalitiveTotal: cumalativeTotal.sum, monthTarget: target, yearlyTarget, targetToDate, targetAcheived});
      })

      state.exportData = eData;
    },

    clearExportData: (state, action) => {
      state.exportData = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getTenders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTenders.fulfilled, (state, action) => {
      state.data = action.payload.tenders;

      updateData(state, action.payload.tenders, action.payload.authenticatedUser);

      state.loading = false;
    });

    builder.addCase(getTenders.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addTender.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addTender.fulfilled, (state, action) => {
      const { _id, month, newValue } = action.payload.data;
      const authenticatedUser = action.payload.authenticatedUser;

      const itemToEditIndex = state.data.findIndex((item) => item._id === _id);

      if (itemToEditIndex > -1) {
        const updatedArray = [...state.data];
        const updatedItemIndex = updatedArray[itemToEditIndex].items.findIndex((item) => item.month === month);

        if (updatedItemIndex > -1) {
          updatedArray[itemToEditIndex].items[updatedItemIndex].value = parseInt(newValue);
        } else {
          console.error("Item not found for the specified month");
        }

        state.data = updatedArray;
        updateData(state, updatedArray, authenticatedUser);
      }
      state.loading = false;
    });

    builder.addCase(addTender.rejected, (state, action) => {
      state.loading = false;
    });
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, buildData, setAuthenticatedUser, resetTenderState, generateExportData, clearExportData } = tenderSlice.actions;

export default tenderSlice.reducer;

const updateData = (state, newData, authenticatedUser) => {
  const ukCoreTotals = generateUkCoreTenderTotals(newData, authenticatedUser);
  const cumalitiveTotals = generateCumalitiveTenderTotals(newData, authenticatedUser); // The sum of each months totals for each location
  const ukCumalitiveTotalsTotal = generateUKTenendersCumaltiveTotal(cumalitiveTotals); // The sum of the uk cumalitive totals
  const specialCumalitiveTotals = generateSpecialCumalitiveTotals(cumalitiveTotals);

  state.ukCoreTotals = ukCoreTotals;
  state.cumalitiveTotals = cumalitiveTotals;
  state.ukCumalitiveTotal = ukCumalitiveTotalsTotal;
  state.specialCumalitiveTotals = specialCumalitiveTotals;
}