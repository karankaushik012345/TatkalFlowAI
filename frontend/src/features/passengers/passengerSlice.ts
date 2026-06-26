import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  passengers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getPassengers = createAsyncThunk('passengers/getAll', async (_, thunkAPI) => {
  try {
    const response = await api.get('/passengers');
    return response.data;
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createPassenger = createAsyncThunk('passengers/create', async (passengerData: any, thunkAPI) => {
  try {
    const response = await api.post('/passengers', passengerData);
    return response.data;
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const passengerSlice = createSlice({
  name: 'passenger',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPassengers.pending, (state) => { state.isLoading = true; })
      .addCase(getPassengers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.passengers = action.payload;
      })
      .addCase(getPassengers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createPassenger.fulfilled, (state, action) => {
        state.passengers.push(action.payload as never);
      });
  },
});

export const { reset } = passengerSlice.actions;
export default passengerSlice.reducer;
