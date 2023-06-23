import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authServices';

export const currentToken = localStorage.getItem('myToken');
const role = false;

const initialState = {
  token: currentToken,
  email: false,
  isError: false,
  isSuccess: false,
  isSuccessPassword: false,
  isLoading: false,
  isSeller: role,
  changePassword: false,
  message: ''
};

const resetStates = {
  email: false,
  incorrectCred: false,
  changePassword: false,
  isError: false,
  isSuccess: false,
  isSuccessPassword: false,
  isLoading: false,
  isSeller: false
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
        state.token = payload.Authorization;
        state.changePassword = payload.changePassword;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      //TWO FACTOR AUTHENTICATION
      .addCase(login2FA.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login2FA.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSeller = true;
        state.isError = false;
        state.token = payload.Authorization;
        state.changePassword = payload.changePassword;
      })
      .addCase(login2FA.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })

      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload;
        state.isSeller = true;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.isSeller = false;
      })
      // REQUEST RESET PASSWORD

      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestPasswordReset.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccessPassword = true;
        state.isError = false;
        state.message = payload;
      })
      .addCase(requestPasswordReset.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccessPassword = false;
        state.message = payload;
      })
      //RESET PASSWORD

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccessPassword = true;
        state.message = payload;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccessPassword = false;

        state.message = payload;
      })
      .addCase(changePasssword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePasssword.fulfilled, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccessPassword = true;
        state.message = payload;
      })
      .addCase(changePasssword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccessPassword = false;
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
export const login2FA = createAsyncThunk(
  'login2FA-thunk',
  async (data, thunkAPI) => {
    try {
      return await authServices.login2FA(data);
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

export const signup = createAsyncThunk(
  'signup-thunk',
  async (data, thunkAPI) => {
    try {
      return await authServices.signup(data);
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
// RESET PASSWORD REQUEST
export const requestPasswordReset = createAsyncThunk(
  'resetPasswordResquest-thunk',
  async (data, thunkAPI) => {
    try {
      return await authServices.requestPasswordReset(data);
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
//RESET PASSWORD
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, thunkAPI) => {
    const { token, password } = data;
    try {
      return await authServices.resetPassword(token, password);
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
export const changePasssword = createAsyncThunk(
  'auth/changePassword',
  async (data, thunkAPI) => {
    try {
      return await authServices.changePassword(data);
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
export const { reset } = authSlice.actions;
export default authSlice.reducer;
