import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authApi } from '../../api';
import storegeKeys from '../../constants/storegeKeys';
import { removeSession, setSession, setUserName } from '../../utils';
const initialState = {
  current: localStorage.getItem(storegeKeys.USER),
};
export const loginAccount = createAsyncThunk('auth/login', async (payload) => {
  const response = await authApi.loginUser(payload);
  const { tokens, user } = response;
  setSession(tokens.access.token, tokens.refresh.token, user.userName, user.id);
  return user?.userName;
});
export const registerAccount = createAsyncThunk(
  'auth/register',
  async (payload) => {
    // Call API to register
    const user = await authApi.registerUser(payload);
    console.log(user);
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.tokens.access.token}`;
    // reture data
    return user.userName;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.current = null;
      removeSession();
    },
    editProfile: (state, action) => {
      state.current = action.payload.userName;
      setUserName(action.payload.userName);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    builder.addCase(registerAccount.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { login_form, logout, editProfile } = authSlice.actions;

export default authSlice.reducer;
