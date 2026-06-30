import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/resend-otp`, { email });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to resend code');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ name, onboarded, profilePhoto }, { getState, rejectWithValue }) => {
    try {
      const { auth: { user } } = getState();
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.put(`${API_URL}/auth/profile`, { name, onboarded, profilePhoto }, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed');
    }
  }
);

const getUserFromLocalStorage = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || 'light';
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
  loading: false, // For async actions like login
  initialLoading: false, 
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('userInfo');
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      document.documentElement.setAttribute('data-theme', state.theme);
    },
    setInitialTheme: (state) => {
      document.documentElement.setAttribute('data-theme', state.theme);
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        // Do not set user here, we need OTP verification
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state) => {
        state.loading = false;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, toggleTheme, setInitialTheme } = authSlice.actions;
export default authSlice.reducer;
