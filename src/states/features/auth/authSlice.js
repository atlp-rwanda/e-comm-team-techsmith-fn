/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authServices';

const currentToken = localStorage.getItem('myToken');

const initialState = {
  token: currentToken,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

const resetStates = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Creating authslice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => {
      return resetStates;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.token = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  }
});

export const login = createAsyncThunk('login-thunk', async (data, thunkAPI) => {
  try {
    return await authServices.login(data);
  } catch (error) {
    let message;
    if (error.code === 'ERR_NETWORK') {
      message = 'Make sure you are connected to the internet';
    } else if (error.response) {
      message = error.response.data.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// export auth slice
export const { reset } = authSlice.actions;
export default authSlice.reducer;
