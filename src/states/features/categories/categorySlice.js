import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    products: []
  },
  reducers: {
    setCategoryProducts: (state, action) => {
      state.products = [...action.payload];
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
    }
  }
});

export const { setCategoryProducts, setCategories } = categorySlice.actions;
export default categorySlice.reducer;
