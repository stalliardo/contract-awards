import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, addLocationToUser, removeLocationFromUser, addAllLocationsToUser, addProvidedLocationsToUser
 } from '../users/usersThunk';
import { extractFirstAndLastName } from '../../../utils/stringUtils';

const initialState = {
  data: [],
  authenticatedUser: {
    fullName: ""
  },
  loading: false,
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
    },

    logout: (state) => {
      // This will be caught in the index.js file to trigger a state wipe
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const {users, updatedUser} = action.payload;

      state.authenticatedUser = updatedUser;
      state.data = users;

      state.loading = false;
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

    builder.addCase(addProvidedLocationsToUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addProvidedLocationsToUser.fulfilled, (state, action) => {
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

    builder.addCase(addProvidedLocationsToUser.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(removeLocationFromUser.fulfilled, (state, action) => {
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

export const { setLoading, setSignedInUsersFullName, clearAuthenticatedUserData, logout } = usersSlice.actions;

export default usersSlice.reducer;