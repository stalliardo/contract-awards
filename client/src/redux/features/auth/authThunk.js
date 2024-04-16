import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (token, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/auth/verify/${token}`);
            return {data: response.data, status: response.status};
        } catch (error) {
            return rejectWithValue(error.response.status);
        }
    },
)

export { verifyToken }