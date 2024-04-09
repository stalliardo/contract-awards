import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const fetchData = createAsyncThunk(
    'awards/fetchData',
    async () => {
        try {
            const awards = await axios.get("/api/awards-diary/getAllAwards");
            const targets = await axios.get("/api/targets");

            return {targetsData: targets.data, awardsData: awards.data};
        } catch (error) {
            console.log('catch called + error: ', error);
            return new Error("There was an error getting the data.")
        }
    },
)

export { fetchData }