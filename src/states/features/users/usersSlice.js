import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersServices from './usersServices';

const initialState = {
  isPending: false,
  networkError: false,
  message: '',
  page: 1,
  totalpages: '...',
  page2: 2,
  page3: 3,
  userList: [],
  accountStatus: true,
  isLoading: false
};

const resetStates = {
  isPending: false,
  networkError: false,
  message: '',
  page: 1,
  totalpages: '...',
  page2: 2,
  page3: 3
};
// Creating authslice
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: () => {
      return resetStates;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingAllUsers.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchingAllUsers.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.userList = payload.payments;
        state.totalpages = payload.totalPages;
      })
      .addCase(fetchingAllUsers.rejected, (state, { payload }) => {
        state.isPending = false;
        state.networkError = true;
        state.message = payload;
      })

      // disable user
      .addCase(disableUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disableUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
        state.accountStatus = false;
      })
      .addCase(disableUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
      })

      // enable user
      .addCase(enableUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(enableUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
        state.accountStatus = true;
      })
      .addCase(enableUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
      });
  }
});

export const disableUser = createAsyncThunk(
  'disable-thunk',
  async (data, thunkAPI) => {
    try {
      return await usersServices.disable(data);
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const enableUser = createAsyncThunk(
  'enable-thunk',
  async (data, thunkAPI) => {
    try {
      return await usersServices.enable(data);
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchingAllUsers = createAsyncThunk(
  'allUsers-thunk',
  async (data, thunkAPI) => {
    try {
      return await usersServices.allusers(data);
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export auth slice
export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
