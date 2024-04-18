import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const getTenders = createAsyncThunk(
    'tender/get',
    async (rejectWithValue) => {
        try {
            const tenders = await axios.get(`/api/tenders`);
            return tenders.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
)

const addTender = createAsyncThunk(
    'tender/put',
    async (data, {rejectWithValue}) => {
        try {
            await axios.put(`/api/tenders`, data);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
)

export { getTenders, addTender }