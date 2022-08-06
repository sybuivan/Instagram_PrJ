import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi, followApi, postApi } from '../../api';
const initialState = {
  modal: {
    CREATE_POST: false,
    UNFOLLOW: false,
    MORE_POST: false,
    CANCEL: false,
    FOLLOWING: false,
    FOLLOWERE: false,
    VIEW_POST: false,
    LIKES: false,
    COMMENT: false,
    MODAL_DELETE: false,
  },
  loading: false,
  listUserSuggets: [],
  listUserFriends: [],
  ListPostFriend: [],
  inforUser: {},
};

export const fetchUserSuggets = createAsyncThunk(
  'user/user-suggets',
  async (payload) => {
    const { listUserSuggets } = await userApi.getSuggetionsForUser(payload);
    return listUserSuggets;
  }
);
export const fetchUserFriends = createAsyncThunk(
  'user/user-friends',
  async (payload) => {
    const { friends } = await followApi.getFriendsMe(payload);
    return friends[0].following;
  }
);

export const fetchPostFriends = createAsyncThunk(
  'post/post-friend',
  async (payload) => {
    const { newList } = await postApi.getPostAllFriend(payload);
    return newList;
  }
);

export const fetchGetInfor = createAsyncThunk('user/infor', async (payload) => {
  const user = await userApi.getUser(payload);
  return user;
});

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
        case 'VIEW_POST': {
          state.modal.VIEW_POST = true;
          break;
        }
        case 'LIKES': {
          state.modal.LIKES = true;
          break;
        }
        case 'COMMENT': {
          state.modal.COMMENT = true;
          break;
        }
        case 'MODAL_DELETE': {
          state.modal.MODAL_DELETE = true;
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
        case 'VIEW_POST': {
          state.modal.VIEW_POST = false;
          break;
        }
        case 'LIKES': {
          state.modal.LIKES = false;
          break;
        }
        case 'COMMENT': {
          state.modal.COMMENT = false;
          break;
        }
        case 'MODAL_DELETE': {
          state.modal.MODAL_DELETE = false;
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
  extraReducers: (builder) => {
    builder.addCase(fetchUserSuggets.fulfilled, (state, action) => {
      state.listUserSuggets = action.payload;
    });
    builder.addCase(fetchUserFriends.fulfilled, (state, action) => {
      state.listUserFriends = action.payload;
    });
    builder.addCase(fetchPostFriends.fulfilled, (state, action) => {
      state.ListPostFriend = action.payload;
    });
    builder.addCase(fetchGetInfor.fulfilled, (state, action) => {
      state.inforUser = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { showModal, hiddenModal, setLoading, hiddenLoading } =
  homeSlice.actions;

export default homeSlice.reducer;
