import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { getFinancialYearString } from '../../../utils/DateUtils';

const fetchData = createAsyncThunk(
    'awards/fetchData',
    async ({locationData, authenticatedUser, selectedFinancialYear}) => {
        try {
            const awards = await axios.get(`/api/awards-diary/getAllAwards/?year=${selectedFinancialYear}`);
            const targets = await axios.get(`/api/targets/?year=${selectedFinancialYear}`);
            const yearString = getFinancialYearString();

            console.log('loactions from fetchData 1 = ', locationData);

            if(locationData.length) {
                return {targetsData: targets.data, awardsData: awards.data, locationsData: locationData, authenticatedUser};
            } else {
                const locations = await axios.get(`/api/location/get-locations/${yearString}`);

                console.log('locations from fetchData = ', locations);
                return {targetsData: targets.data, awardsData: awards.data, locationsData: locations.data, authenticatedUser};
            }
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

const deleteItem = createAsyncThunk(
    'awards/deleteItem',
    async ({data, location, month, value}) => {
        try {
            const response = await axios.delete(`/api/awards-diary/${data.awardsDiary}/items/${data._id}`);

            response.data.location = location;
            response.data.month = month;
            response.data.value = value;

            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            throw Error("There was an error deleting the data.")
        }
    },
)

export { fetchData, addData, editItem, deleteItem }