import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const fetchUsers = createAsyncThunk(
    'awards/fetchUsers',
    async () => {
        try {
            const response = await axios.get("/api/ad/get-AD-users");
            return response.data;
        } catch (error) {
            console.log('catch called + error: ', error);
            return new Error("There was an error getting the data.")
        }
    },
)

export { fetchUsers }