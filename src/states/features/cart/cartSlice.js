import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartServices from './cartServices';

const initialState = {
  cart: [],
  isLoading: false,
  isClearing: false,
  isError: false,
  isSuccess: false,
  isAdded: false,
  isDeleting: false,
  isDeleted: false,
  message: ''
};

const resetStates = {
  cart: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isClearing: false,
  isAdded: false,
  isDeleting: false,
  message: ''
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: () => {
      return resetStates;
    },
    resetDeleted: () => {
      return { isDeleted: false };
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
      })

      // CLEAR CART
      .addCase(clearCart.pending, (state) => {
        state.isClearing = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isClearing = false;
        state.cart = [];
      })
      .addCase(clearCart.rejected, (state) => {
        state.isClearing = false;
        state.isError = true;
      })

      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.message = payload;
        state.isAdded = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        state.message = payload;
        state.isLoading = false;
        state.isAdded = false;
        state.isError = true;
      })

      // DELETE SINGLE ITEM
      .addCase(deleteSingleItem.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteSingleItem.fulfilled, (state, { payload }) => {
        state.isDeleting = false;
        state.isDeleted = true;
        state.message = payload;
      })
      .addCase(deleteSingleItem.rejected, (state, { payload }) => {
        state.isDeleting = false;
        state.isDeleted = false;
        state.message = payload;
      });
  }
});

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (data, thunkAPI) => {
    try {
      const response = await cartServices.getCart();

      return response;
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Request timeout';
      } else {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ADD TO CART
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, thunkAPI) => {
    try {
      const response = await cartServices.addToCart(productId);
      return response;
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Request timeout';
      } else {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (data, thunkAPI) => {
    try {
      const response = await cartServices.clearCart();

      return response;
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Request timeout';
      } else {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSingleItem = createAsyncThunk(
  'cart/deleteSingleItem',
  async (productId, thunkAPi) => {
    try {
      const response = await cartServices.deleteSingleItem(productId);
      return response;
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Request timeout';
      } else {
        message = error.response.data.message;
      }
      return thunkAPi.rejectWithValue(message);
    }
  }
);

// export authslice
export const { reset, resetDeleted } = cartSlice.actions;
export default cartSlice.reducer;
