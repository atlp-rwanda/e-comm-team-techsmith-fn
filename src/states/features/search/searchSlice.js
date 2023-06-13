import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    searchData: {
      name: 'Product',
      categoryIds: 76,
      price: 0,
      size: 20,
      page: 1
    },
    products: [],
    categories: []
  },
  reducers: {
    getProduct: (state, action) => {
      return action.payload;
    },
    addSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    searchProduct: (state, { payload }) => {
      state.products = payload;
    },
    addCategories: (state, { payload }) => {
      state.categories = payload;
    },
    getCategories: (state, { payload }) => {
      return payload;
    }
  }
});

export const {
  getProduct,
  addSearchData,
  searchProduct,
  addCategories,
  getCategories
} = productSlice.actions;

export default productSlice.reducer;
