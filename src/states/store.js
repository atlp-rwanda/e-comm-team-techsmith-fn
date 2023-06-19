import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import chatReducer from './features/chat/chatSlice';
import authReducer from './features/auth/authSlice';
import userReducer from './features/users/usersSlice';
import productReducer from './features/search/searchSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chat: chatReducer,
    auth: authReducer,
    users: userReducer,
    search: productReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export { store };
