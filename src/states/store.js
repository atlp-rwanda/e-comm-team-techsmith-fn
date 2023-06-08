/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
