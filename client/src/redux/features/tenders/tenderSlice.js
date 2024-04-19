import { createSlice } from '@reduxjs/toolkit';
import { addTender, getTenders } from './tenderThunk';
import { generateCumalitiveTenderTotals, generateUKTenendersCumaltiveTotal, generateUkCoreTenderTotals } from '../../../utils/financialTotals';

const initialState = {
  data: [],
  loading: true,
  error: null,
  ukCoreTotals: [], // ie, the total for each month
};

export const tenderSlice = createSlice({
  name: 'tender',
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getTenders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTenders.fulfilled, (state, action) => {
      state.data = action.payload;

      const cumalitiveTotals = generateCumalitiveTenderTotals(action.payload); // The sum of each months totals for each location
      const ukCumalitiveTotalsTotal = generateUKTenendersCumaltiveTotal(cumalitiveTotals); // The sum of the uk cumalitive totals

      state.ukCoreTotals = generateUkCoreTenderTotals(action.payload);
      state.cumalitiveTotals = cumalitiveTotals;
      state.ukCumalitiveTotal = ukCumalitiveTotalsTotal;
      state.loading = false;
    });

    builder.addCase(getTenders.rejected, (state, action) => {
      state.loading = false;
    });


    builder.addCase(addTender.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addTender.fulfilled, (state, action) => {
      const { _id, month, newValue } = action.payload;
      const itemToEditIndex = state.data.findIndex((item) => item._id === _id);

      if (itemToEditIndex > -1) {
        const updatedArray = [...state.data];

        const updatedItemIndex = updatedArray[itemToEditIndex].items.findIndex((item) => item.month === month);

        if (updatedItemIndex > -1) {
          updatedArray[itemToEditIndex].items[updatedItemIndex].value = newValue;
        } else {
          console.error("Item not found for the specified month");
        }

        state.data = updatedArray;
      }
      state.loading = false;
    });

    builder.addCase(addTender.rejected, (state, action) => {
      state.loading = false;
    });
  }
})

// Action creators are generated for each case reducer function
export const { setLoading } = tenderSlice.actions;

export default tenderSlice.reducer;