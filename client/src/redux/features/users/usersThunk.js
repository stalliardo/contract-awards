import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { extractFirstAndLastName } from '../../../utils/stringUtils';
import { ROLES } from '../../../utils/constants';

const fetchUsers = createAsyncThunk(
    'awards/fetchUsers',
    async (fullName) => {
        try {

            console.log('FETCH called');
            
            const users = await axios.get("/api/users");
            const locations = await axios.get("/api/location/get-locations");

            if (users && locations) {
                const name = extractFirstAndLastName(fullName);
                const foundUser = users.data.find(user => user?.name.toLowerCase() === name.toLowerCase());

                if (foundUser.role === ROLES.CA01 && foundUser.locations.length < locations.data.length) {
                    const updatedUser = await axios.put(`/api/users/${foundUser._id}/locations`);
                    return { users: users.data, updatedUser };
                }

                return { users: users.data, locations: locations.data, updatedUser: foundUser }

            } else {
                throw Error("There was an error getting the data.")
            }
            
        } catch (error) {
            console.log('catch called + error: ', error);
            throw Error("There was an error getting the data.")
        }
    },
)

const addLocationToUser = createAsyncThunk(
    'awards/addLocationToUser',
    async (data) => {
        try {
            const response = await axios.post("/api/users/location", data);
            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            throw Error("There was an error adding the location to the user.")
        }
    },
)

const removeLocationFromUser = createAsyncThunk(
    'awards/removeLocationFromUser',
    async (data) => {
        try {
            const response = await axios.delete(`/api/users/${data.userId}/location/${data.location}`);
            return response.data;
        } catch (error) {
            throw Error("There was an error removing the location from the user.")
        }
    },
)

const addAllLocationsToUser = createAsyncThunk(
    'awards/addAllLocationsToUser',
    async (data) => {
        try {
            const response = await axios.put(`/api/users/${data.userId}/locations`);
            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            throw Error("There was an error adding the location to the user.")
        }
    },
)



export { fetchUsers, addLocationToUser, removeLocationFromUser, addAllLocationsToUser }
