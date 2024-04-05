import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const fetchUsers = createAsyncThunk(
    'awards/fetchUsers',
    async () => {
        try {
            const response = await axios.get("/api/users");
            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            return new Error("There was an error getting the data.")
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
            return new Error("There was an error adding the location to the user.")
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
            return new Error("There was an error removing the location from the user.")
        }
    },
)

export { fetchUsers, addLocationToUser, removeLocationFromUser }