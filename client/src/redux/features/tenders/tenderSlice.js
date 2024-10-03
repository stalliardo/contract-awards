import { createSlice } from '@reduxjs/toolkit';
import { addTender, getTenders } from './tenderThunk';
import { generateCompanyPerformanceCumalitiveTotals, generateCumalitiveTenderTotals, generateSpecialCumalitiveTotals, generateTargetAcheivedPercentage, generateTargetAmountToDate, generateUKTenendersCumaltiveTotal, generateUkCoreTenderTotals } from '../../../utils/financialTotals';
import { addSlashToYearString } from '../../../utils/stringUtils';

const initialState = {
  data: [],
  loading: true,
  error: null,
  cumalitiveTotals: [],
  ukCumalitiveTotal: "",
  ukCoreTotals: [],
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
      const selectedFinancialYear = action.payload.selectedFinancialYear;

      console.log('sfy = ', selectedFinancialYear);

      let eData = { coreTotals: [], ukCoreTotalsRow: {}, specialTotals: [], totals: {}, monthlyPerformaceRow: {}, cumalitivePerformanceRow: {} };

      locations.forEach((location) => {
        console.log('lcoation = ', location);
        if (location.name !== "M&E" && location.name !== "Europe") {
          const dataItem = state.data.find(item => item.location === location.name);
          const cumalativeTotal = state.cumalitiveTotals.find(item => item.location === location.name);
          console.log('cuma total = ', cumalativeTotal);
          const target = parseInt(targets.find(target => target.location === location.name)?.targetValue) || 0;
          const yearlyTarget = target * 12;
          const targetToDate = Math.round(generateTargetAmountToDate(yearlyTarget, addSlashToYearString(selectedFinancialYear)));
          let targetAcheived = generateTargetAcheivedPercentage(yearlyTarget, cumalativeTotal, addSlashToYearString(selectedFinancialYear));

          if (isNaN(targetAcheived)) {
            targetAcheived = 0;
          }

          eData.coreTotals.push({ location: location.name, items: [...dataItem.items], cumalitiveTotal: cumalativeTotal?.sum, monthTarget: target, yearlyTarget, targetToDate, targetAcheived });
        }
      })

      // eData.push({ location: "UK Core Total"});
      const ukCoreTotalItems = state.ukCoreTotals;

      const ukCoreTotalTarget = targets.filter(item => item.location !== "Europe" && item.location !== "M&E").reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0);
      const ukcoreTotalYearlyTarget = ukCoreTotalTarget * 12;
      const ukCoreTotalTargetToDate = Math.round(generateTargetAmountToDate(ukcoreTotalYearlyTarget, addSlashToYearString(selectedFinancialYear)));
      const targetAcheived = generateTargetAcheivedPercentage(ukcoreTotalYearlyTarget, state.ukCumalitiveTotal, addSlashToYearString(selectedFinancialYear));

      eData.ukCoreTotalsRow = { location: "UK Core Total", items: ukCoreTotalItems, cumalitiveTotal: state.ukCumalitiveTotal, monthTarget: ukCoreTotalTarget, yearlyTarget: ukcoreTotalYearlyTarget, targetToDate: ukCoreTotalTargetToDate, targetAcheived: targetAcheived };

      const specialLocations = ["M&E", "Europe"];

      specialLocations.forEach((location) => {
        const dataItem = state.data.find(item => item.location === location);
        const cumalativeTotal = state.cumalitiveTotals.find(item => item.location === location);
        const target = parseInt(targets.find(target => target.location === location)?.targetValue) || 0;
        const yearlyTarget = target * 12;
        const targetToDate = Math.round(generateTargetAmountToDate(yearlyTarget, addSlashToYearString(selectedFinancialYear)));

        eData.specialTotals.push({ location: location, items: [...dataItem.items], cumalitiveTotal: cumalativeTotal.sum, monthTarget: target, yearlyTarget, targetToDate });
      });

      // Totals:
      const ukAndSpecialCumalitiveTotal = state.ukCumalitiveTotal + state.specialCumalitiveTotals;
      const ukAndSpecialTargetTotal = targets.reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0);
      const ukAndSpecialTargetYearlyTotal = ukAndSpecialTargetTotal * 12;
      const ukAndSpecialTargetToDate = Math.round(generateTargetAmountToDate(ukAndSpecialTargetYearlyTotal, addSlashToYearString(selectedFinancialYear)));
      const ukAndSpecialTargetAcheived = generateTargetAcheivedPercentage(ukAndSpecialTargetYearlyTotal, ukAndSpecialCumalitiveTotal, addSlashToYearString(selectedFinancialYear));

      eData.totals = { 
        location: "Total", 
        items: state.ukCoreTotals.all, 
        cumalitiveTotal: ukAndSpecialCumalitiveTotal, 
        monthTarget: targets.reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0), 
        yearlyTarget: ukcoreTotalYearlyTarget, 
        targetToDate: ukAndSpecialTargetToDate, 
        targetAcheived: ukAndSpecialTargetAcheived 
      };
      
      const monthlyPerformaceItems = state.ukCoreTotals.all.map((total, i) => {
        return total.sum - ukAndSpecialTargetTotal;    
      })

      eData.monthlyPerformaceRow = { 
        location: " ", 
        items: monthlyPerformaceItems, 
      };

      const cumalitivePerformanceRow = generateCompanyPerformanceCumalitiveTotals(state.ukCoreTotals.all, ukAndSpecialTargetTotal).map(item => item.sum);

      eData.cumalitivePerformanceRow = { 
        location: " ", 
        items: cumalitivePerformanceRow, 
      };

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