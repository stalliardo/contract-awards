import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const fetchData = createAsyncThunk(
    'awards/fetchData',
    async () => {
        try {
            console.log('NETWORK REQUEST MADE');
            const response = await axios.get("/api/awards-diary/location?location=Basingstoke");
            return response.data;
        } catch (error) {
            return new Error("There was an error getting the data.")
        }
    },
)

export { fetchData }