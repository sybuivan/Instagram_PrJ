import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../../api';
export const deletePostById = createAsyncThunk(
  '/post/delete',
  async (payload) => {
    await postApi.deletePostId(payload);
  }
);
export const fetchGetDetailPost = createAsyncThunk(
  '/post/details',
  async (payload) => {
    const { posted } = await postApi.getPostById(payload);
    return posted;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    inforPost: {},
    isShowContentPost: false,
    isEditPost: false,
    detailsPost: [],
  },
  reducers: {
    getInforPost: (state, action) => {
      const { idPost, userName, userLogin } = action.payload;
      if (userName === userLogin) {
        state.inforPost = { idPost, isPostMe: true };
      } else {
        state.inforPost = { idPost, isPostMe: false };
      }
    },

    showContentPost: (state, action) => {
      switch (action.payload) {
        case 'show':
          state.isShowContentPost = true;
          break;
        case 'hidden':
          state.isShowContentPost = false;
          break;
        default:
          break;
      }
    },
    showFormEditPost: (state, action) => {
      switch (action.payload) {
        case 'show':
          state.isEditPost = true;
          break;
        case 'hidden':
          state.isEditPost = false;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deletePostById.fulfilled, (action, payload) => {
      //
    });
    builder.addCase(fetchGetDetailPost.fulfilled, (state, action) => {
      state.detailsPost = action.payload;
    });
  },
});
// Action creators are generated for each case reducer function
export const { getInforPost, showContentPost, showFormEditPost } =
  postSlice.actions;

export default postSlice.reducer;
