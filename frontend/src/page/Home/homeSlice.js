import { createSlice } from '@reduxjs/toolkit';
import storegeKeys from '../../constants/storegeKeys';
const initialState = {
  modal: {
    CREATE_POST: false,
    UNFOLLOW: false,
    MORE_POST: false,
    CANCEL: false,
    FOLLOWING: false,
    FOLLOWERE: false,
  },
  loading: false,
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
        case 'CANCEL': {
          state.modal.CANCEL = true;
          break;
        }
        case 'FOLLOWING': {
          state.modal.FOLLOWING = true;
          break;
        }
        case 'FOLLOWERE': {
          state.modal.FOLLOWERE = true;
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
        case 'CANCEL': {
          state.modal.CANCEL = false;
          break;
        }
        case 'FOLLOWING': {
          state.modal.FOLLOWING = false;
          break;
        }
        case 'FOLLOWERE': {
          state.modal.FOLLOWERE = false;
          break;
        }
        default:
          break;
      }
    },
    setLoading: (state) => {
      state.loading = true;
    },
    hiddenLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showModal, hiddenModal, setLoading, hiddenLoading } =
  homeSlice.actions;

export default homeSlice.reducer;
