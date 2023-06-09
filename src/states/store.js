import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import chatReducer from './features/chat/chatSlice';
import authReducer from './features/auth/authSlice';
import userReducer from './features/users/usersSlice';
import productReducer from './features/search/searchSlice';
import sellerReducer from './features/seller/sellerSlice';
import categorySlice from './features/categories/categorySlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chat: chatReducer,
    auth: authReducer,
    cart: cartReducer,
    users: userReducer,
    search: productReducer,
    seller: sellerReducer,
    categories: categorySlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export { store };
