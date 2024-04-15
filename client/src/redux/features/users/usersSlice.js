import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, addLocationToUser, removeLocationFromUser, addAllLocationsToUser
 } from '../users/usersThunk';
import { extractFirstAndLastName } from '../../../utils/stringUtils';

const initialState = {
  data: [],
  authenticatedUser: {},
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

    setSignedInUser: (state, action) => {
      const fullName = extractFirstAndLastName(action.payload);

      console.log('fullname = ', fullName);

      state.authenticatedUser = state.data.find((user) => user.name.toLowerCase() === fullName.toLowerCase());

    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log('\n\nusers fulfilled called. Data = ', action.payload);
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log('rejected called + error = ', action.payload);
      state.loading = true;
    });


    builder.addCase(addLocationToUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addLocationToUser.fulfilled, (state, action) => {
      state.loading = false;

      const updatedUser = action.payload;

      // replace the user in the existing array
      const userToReplaceIndex = state.data.findIndex(user => user._id === updatedUser._id);

      if (userToReplaceIndex > -1) {
        // Create a new array updatedArray using the spread operator (...state.data) to maintain immutability.
        const updatedArray = [...state.data];
        updatedArray[userToReplaceIndex] = updatedUser;
        state.data = updatedArray;
      }
    });

    builder.addCase(addAllLocationsToUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addAllLocationsToUser.fulfilled, (state, action) => {
      state.loading = false;

      const updatedUser = action.payload;

      // replace the user in the existing array
      const userToReplaceIndex = state.data.findIndex(user => user._id === updatedUser._id);

      if (userToReplaceIndex > -1) {
        // Create a new array updatedArray using the spread operator (...state.data) to maintain immutability.
        const updatedArray = [...state.data];
        updatedArray[userToReplaceIndex] = updatedUser;
        state.data = updatedArray;
      }
    });

    builder.addCase(removeLocationFromUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(removeLocationFromUser.fulfilled, (state, action) => {
      state.loading = false;

      const updatedUser = action.payload.user;

      // replace the user in the existing array
      const userToReplaceIndex = state.data.findIndex(user => user._id === updatedUser._id);

      if (userToReplaceIndex > -1) {
        // Create a new array updatedArray using the spread operator (...state.data) to maintain immutability.
        const updatedArray = [...state.data];
        updatedArray[userToReplaceIndex] = updatedUser;
        state.data = updatedArray;
      }
    });
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, setSignedInUser } = usersSlice.actions;

export default usersSlice.reducer;