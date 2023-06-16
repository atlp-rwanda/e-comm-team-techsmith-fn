import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sellerServices from './sellerServices';

const initialState = {
  page: 1,
  item: {},
  isPending: false,
  networkError: false,
  totalpages: 0,
  isLoading: false,
  myCollection: []
};

const resetStates = {
  isPending: false,
  networkError: false,
  totalpages: '...',
  item: {},
  isLoading: false
};
// Creating authslice
export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    reset: () => {
      return resetStates;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingMyCollection.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchingMyCollection.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.myCollection = payload.products;
        state.totalpages = payload.totalPages;
      })
      .addCase(fetchingMyCollection.rejected, (state, { payload }) => {
        state.isPending = false;
        state.networkError = true;
      })
      .addCase(fetchingOneItem.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchingOneItem.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.item = payload;
      })
      .addCase(fetchingOneItem.rejected, (state, { payload }) => {
        state.isPending = false;
        state.networkError = true;
      });
  }
});

export const fetchingMyCollection = createAsyncThunk(
  'myCollection-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.getMyStock(data);
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
export const fetchingOneItem = createAsyncThunk(
  'oneItem-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.getItem(data);
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
export const { reset } = sellerSlice.actions;
export default sellerSlice.reducer;
