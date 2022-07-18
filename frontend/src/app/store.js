import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../page/Auth/';
import { homeSlice } from '../page/Home';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    home: homeSlice,
  },
});
