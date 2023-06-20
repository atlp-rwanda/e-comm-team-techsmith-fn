import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishlistServices from './wishlistServices';

const initialState = {
  isError: false,
  isSuccess: false,
  isPending: false,
  message: '',
  isWishlisted: false
};

const resetStates = {
  isError: false,
  isSuccess: false,
  isPending: false,
  message: ''
};
// Creating wishlistslice
export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    reset: () => {
      return resetStates;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingAllWishlist.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchingAllWishlist.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.isSuccess = true;
        state.message = payload.data;
      })
      .addCase(fetchingAllWishlist.rejected, (state, { payload }) => {
        state.isPending = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })

      .addCase(addToWishlist.pending, (state) => {
        state.isPending = true;
      })
      .addCase(addToWishlist.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.isSuccess = true;
        state.message = payload.data;
      })
      .addCase(addToWishlist.rejected, (state, { payload }) => {
        state.isPending = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      });
  }
});

export const fetchingAllWishlist = createAsyncThunk(
  'allWishlist-thunk',
  async (data, thunkAPI) => {
    try {
      return await wishlistServices.getAllWishlist();
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

export const addToWishlist = createAsyncThunk(
  'addToWishlist-thunk',
  async (data, thunkAPI) => {
    try {
      return await wishlistServices.addToWishlist(data);
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

// export wishlist slice
export const { reset } = wishlistSlice.actions;
export default wishlistSlice.reducer;
