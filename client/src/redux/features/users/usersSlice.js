import { createSlice, current } from '@reduxjs/toolkit';
import { fetchUsers, addLocationToUser, removeLocationFromUser, addAllLocationsToUser
 } from '../users/usersThunk';
import { extractFirstAndLastName } from '../../../utils/stringUtils';

const initialState = {
  data: [],
  authenticatedUser: {
    fullName: ""
  },
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

    setSignedInUsersFullName: (state, action) => {
      state.authenticatedUser.fullName = extractFirstAndLastName(action.payload);
    },

    clearAuthenticatedUserData: (state) => {
      state.authenticatedUser = {};
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const foundUser = action.payload.find(user => user.name.toLowerCase() === state.authenticatedUser.fullName.toLowerCase());

      state.authenticatedUser = foundUser;
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(addLocationToUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addLocationToUser.fulfilled, (state, action) => {
      state.loading = false;

      // Will also need to update the authenticatedUsers locations TODO

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

export const { setLoading, setSignedInUsersFullName, clearAuthenticatedUserData } = usersSlice.actions;

export default usersSlice.reducer;