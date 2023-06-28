import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    products: [],
    categoryProductsLoading: false,
    selectedCategory: null
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
    },
    updateSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    }
  }
});

export const {
  setCategoryProducts,
  setCategories,
  setProductCategoriesLoading,
  updateSelectedCategory
} = categorySlice.actions;
export default categorySlice.reducer;
