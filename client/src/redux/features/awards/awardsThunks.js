import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const fetchData = createAsyncThunk(
    'awards/fetchData',
    async () => {
        const response = await axios.get("/api/awards-diary/location?location=Basingstoke");
        return response.data;
    },
)

export { fetchData }