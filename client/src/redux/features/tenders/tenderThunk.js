import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const getTenders = createAsyncThunk(
    'tender/get',
    async (authenticatedUser, {rejectWithValue}) => {
        
        try {
            const tenders = await axios.get(`/api/tenders`);
            return {tenders: tenders.data, authenticatedUser};
        } catch (error) {
            return rejectWithValue(error);
        }
    },
)

const addTender = createAsyncThunk(
    'tender/put',
    async (data, {rejectWithValue}) => {
        console.log('data = ', data);
        try {
            await axios.put(`/api/tenders`, data.data);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
)

export { getTenders, addTender }