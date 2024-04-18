import { createSlice } from '@reduxjs/toolkit';
import { addTender, getTenders } from './tenderThunk';

const initialState = {
  data: [],
  loading: true,
  error: null
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
      // console.log('tenders fullfilled data = ', action.payload);
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getTenders.rejected, (state, action) => {
      state.loading = false;
    });


    builder.addCase(addTender.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addTender.fulfilled, (state, action) => {
      console.log('tenders add fullfilled data = ', action.payload);

      // TODO similar logic required as the core totals update to reflext the totals properly
      const { _id, month, newValue } = action.payload;

      const itemToEditIndex = state.data.findIndex((item) => item._id === _id);

      if (itemToEditIndex > -1) {
        const updatedArray = [...state.data];

        const updatedItemIndex = updatedArray[itemToEditIndex].items.findIndex((item) => item.month === month);

        if (updatedItemIndex > -1) {
          // Update the value of the existing item
          updatedArray[itemToEditIndex].items[updatedItemIndex].value = newValue;
        } else {
          // If the item doesn't exist, you may want to handle this case accordingly
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