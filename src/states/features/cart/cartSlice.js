import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartServices from './cartServices';

const initialState = {
  cart: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

const resetStates = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (data, thunkAPI) => {
    try {
      const response = await cartServices.getCart();
      console.log(response);
      return response;
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Request timeout';
      } else {
        message = error.response.data.message;
        console.log(error.response.data);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: () => {
      return resetStates;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = payload;
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  }
});

// export authslice
export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
