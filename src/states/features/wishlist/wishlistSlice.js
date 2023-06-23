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
      //GET ALL WISHLIST
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
      // ADD TO WISHLISTSLICE
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
      })

      // DELETE SINGLE WISHLSTSLICE
      .addCase(deleteWishlist.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteWishlist.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.isSuccess = true;
        state.message = payload.data;
      })
      .addCase(deleteWishlist.rejected, (state, { payload }) => {
        state.isPending = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })

      // DELETE ALL WISHLSTSLICE
      .addCase(deleteAllWishlist.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteAllWishlist.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.isSuccess = true;
        state.message = payload.data;
      })
      .addCase(deleteAllWishlist.rejected, (state, { payload }) => {
        state.isPending = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      });
  }
});
//GET ALL WISHLIST
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
// ADD TO WISHLISTSLICE
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

// DELETE  WISHLSTSLICE
export const deleteWishlist = createAsyncThunk(
  'deleteWishlist-thunk',
  async (data, thunkAPI) => {
    try {
      return await wishlistServices.deleteWishlist(data);
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

// DELETE ALL WISHLSTSLICE
export const deleteAllWishlist = createAsyncThunk(
  'deleteAllWishlist-thunk',
  async (data, thunkAPI) => {
    try {
      return await wishlistServices.deleteAllWishlist(data);
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
