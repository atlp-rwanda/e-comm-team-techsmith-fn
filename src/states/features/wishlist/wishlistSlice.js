import { createSlice } from '@reduxjs/toolkit';

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
    newWishlist: null
  },
  reducers: {
    addToWishlist: (state, { payload }) => {
      state.wishlist.newWishlist = payload;
    },
    updateWishlist: (state, { payload }) => {
      state.wishlist = payload;
    },
    removeFromWishlist: (state, { payload }) => {
      const updatedArray = state.wishlist.filter((item) => {
        return item.productId !== payload;
      });
      state.wishlist = updatedArray;
    }
  }
});

export const { addToWishlist, updateWishlist, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
