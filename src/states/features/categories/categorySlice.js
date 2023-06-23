import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    products: [],
    categoryProductsLoading: false
  },
  reducers: {
    setCategoryProducts: (state, action) => {
      state.products = [...action.payload];
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setProductCategoriesLoading: (state, { payload }) => {
      state.categoryProductsLoading = payload;
    }
  }
});

export const {
  setCategoryProducts,
  setCategories,
  setProductCategoriesLoading
} = categorySlice.actions;
export default categorySlice.reducer;
