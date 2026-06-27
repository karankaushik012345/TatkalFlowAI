import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  templates: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getTemplates = createAsyncThunk('templates/getAll', async (_, thunkAPI) => {
  try {
    const response = await api.get('/templates');
    return response.data;
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTemplate = createAsyncThunk('templates/create', async (templateData: any, thunkAPI) => {
  try {
    const response = await api.post('/templates', templateData);
    return response.data;
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTemplates.pending, (state) => { state.isLoading = true; })
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.templates = action.payload;
      })
      .addCase(getTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.templates.push(action.payload as never);
      });
  },
});

export const { reset } = templateSlice.actions;
export default templateSlice.reducer;
