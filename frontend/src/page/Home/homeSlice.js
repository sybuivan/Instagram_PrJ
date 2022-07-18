import { createSlice } from '@reduxjs/toolkit';
import storegeKeys from '../../constants/storegeKeys';
const initialState = {
  showModal: false,
};
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    showModal: (state) => {
      state.showModal = true;
    },
    hiddenModal: (state) => {
      state.showModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showModal, hiddenModal } = homeSlice.actions;

export default homeSlice.reducer;
