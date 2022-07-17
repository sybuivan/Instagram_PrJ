import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../page/Auth/';
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
