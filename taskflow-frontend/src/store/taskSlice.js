import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ search = '', status = 'All' } = {}, { getState, rejectWithValue }) => {
    try {
      const { auth: { user } } = getState();
      if (!user) throw new Error('Not authenticated');
      
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_URL}/tasks?search=${search}&status=${status}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// We'll dispatch fetchTasks after these actions in the UI components for simplicity, 
// or we can add add/update/delete thunks here. Let's keep it simple for now and just manage the list state.
const initialState = {
  tasks: [],
  loading: true,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
