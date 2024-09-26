import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { extractFirstAndLastName } from '../../../utils/stringUtils';
import { ROLES } from '../../../utils/constants';
import { getFinancialYearString } from '../../../utils/DateUtils';

const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (fullName) => {
        try {
            // **NEW** Passing the yearstring to the locations api is now required to handle removed locations from year to year.
            const yearstring = getFinancialYearString();

            console.log('ys from users tyhubk = ', yearstring);
            const users = await axios.get("/api/users");
            const locations = await axios.get(`/api/location/get-locations/${yearstring}`);

            console.log('locations from fetch = ', locations);

            if (users && locations) {
                let name = extractFirstAndLastName(fullName);
                let foundUser = users.data.find(user => user?.name.toLowerCase() === name.toLowerCase());

                if(!foundUser) {
                    name = name.split(" ")[0];

                    foundUser = users.data.find(user => user?.samAccountName === name);
                }

                if (foundUser.role === ROLES.CA01 && foundUser.locations.length < locations.data.length) {
                    console.log('Called');
                    const updatedUser = await axios.put(`/api/users/${foundUser._id}/locations`);

                    if(updatedUser) {
                        return { users: users.data, updatedUser: updatedUser.data, locations: locations.data };
                    }
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
    'users/addLocationToUser',
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
    'users/removeLocationFromUser',
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
    'users/addAllLocationsToUser',
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

const addProvidedLocationsToUser = createAsyncThunk(
    'users/addProvidedLocationsToUser',
    async (data) => {

        try {
            const response = await axios.put(`/api/users/${data.userId}/add-provided-locations`, {locations: data.locations});
            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            throw Error("There was an error adding the location to the user.")
        }
    },
)

export { fetchUsers, addLocationToUser, removeLocationFromUser, addAllLocationsToUser, addProvidedLocationsToUser }
