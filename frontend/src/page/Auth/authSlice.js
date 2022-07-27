import { createSlice } from '@reduxjs/toolkit';
import storegeKeys from '../../constants/storegeKeys';
import { removeSession, setSession } from '../../utils';
const initialState = {
  current: localStorage.getItem(storegeKeys.USER),
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login_form: (state, action) => {
      console.log(action.payload);
      state.current = action.payload.userName;
      setSession(
        action.payload.token,
        action.payload.refresh,
        action.payload.userName,
        action.payload.id
      );
    },
    logout: (state) => {
      state.current = null;
      removeSession();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login_form, logout } = authSlice.actions;

export default authSlice.reducer;
