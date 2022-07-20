import { createSlice } from '@reduxjs/toolkit';
import storegeKeys from '../../constants/storegeKeys';
const initialState = {
  modal: {
    CREATE_POST: false,
    UNFOLLOW: false,
    MORE_POST: false,
  },
};
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    showModal: (state, action) => {
      switch (action.payload) {
        case 'CREATE_POST':
          state.modal.CREATE_POST = true;
          break;
        case 'UNFOLLOW': {
          state.modal.UNFOLLOW = true;
          break;
        }
        case 'MORE_POST': {
          state.modal.MORE_POST = true;
          break;
        }
        default:
          break;
      }
    },
    hiddenModal: (state, action) => {
      switch (action.payload) {
        case 'CREATE_POST':
          state.modal.CREATE_POST = false;
          break;
        case 'UNFOLLOW': {
          state.modal.UNFOLLOW = false;
          break;
        }
        case 'MORE_POST': {
          state.modal.MORE_POST = false;
          break;
        }
        default:
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { showModal, hiddenModal } = homeSlice.actions;

export default homeSlice.reducer;
