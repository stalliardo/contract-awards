import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, addLocationToUser, removeLocationFromUser } from '../users/usersThunk';

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
      console.log('Fulfilled caalled + action.payload', action.payload);
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(addLocationToUser.pending, (state, action) => {
      console.log('Pending called set is loading to true');
      state.loading = true;
    });

    builder.addCase(addLocationToUser.fulfilled, (state, action) => {
      console.log('Fulfilled caalled for adding a location to user', action.payload);
      // state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(removeLocationFromUser.pending, (state, action) => {
      console.log('Pending called set is loading to true');
      state.loading = true;
    });

    builder.addCase(removeLocationFromUser.fulfilled, (state, action) => {
      console.log('Fulfilled caalled for removing a location from a user', action.payload);
      // state.data = action.payload;
      state.loading = false;

      console.log('action.payload from remove = ', action.payload);

      const updatedUser = action.payload.user;
      console.log('user = ', updatedUser);

      // replace the user in the existing array

      const userToReplaceIndex = state.data.findIndex(user => user._id === updatedUser._id);

      if (userToReplaceIndex > -1) {
        console.log('user found - Replace');

        // Create a new array updatedArray using the spread operator (...state.data) to maintain immutability.
        const updatedArray = [...state.data];


        updatedArray[userToReplaceIndex] = updatedUser;

        state.data = updatedArray;
      }

      // 

    });
  }
})

// Action creators are generated for each case reducer function
export const { setLoading } = usersSlice.actions;

export default usersSlice.reducer;