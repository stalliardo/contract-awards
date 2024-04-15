import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const fetchData = createAsyncThunk(
    'awards/fetchData',
    async () => {
        try {
            const awards = await axios.get("/api/awards-diary/getAllAwards");
            const targets = await axios.get("/api/targets");
            const locations = await axios.get("/api/location/get-locations");

            return {targetsData: targets.data, awardsData: awards.data, locationsData: locations.data};
        } catch (error) {
            console.log('catch called + error: ', error);
            throw Error("There was an error getting the data.")
        }
    },
)

const addData = createAsyncThunk(
    'awards/addData',
    async ({data, location, month}) => {
        
        try {
            const response = await axios.post("/api/awards-diary/add-item", data);
            response.data.location = location;
            response.data.month = month;

            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            throw Error("There was an error adding the data.")
        }
    },
)

const editItem = createAsyncThunk(
    'awards/editItem',
    async ({data, location, month, previousCoreValue}) => {
        
        try {
            const response = await axios.patch("/api/awards-diary/edit-item", data);

            response.data.location = location;
            response.data.month = month;
            response.data.previousCoreValue = previousCoreValue;

            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            throw Error("There was an error adding the data.")
        }
    },
)

export { fetchData, addData, editItem }