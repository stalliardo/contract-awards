import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const fetchData = createAsyncThunk(
    'awards/fetchData',
    async () => {
        try {
            const response = await axios.get("/api/awards-diary/getAllAwards");
            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            return new Error("There was an error getting the data.")
        }
    },
)

export { fetchData }