import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../../api';
export const deletePostById = createAsyncThunk(
  '/post/delete',
  async (payload) => {
    await postApi.deletePostId(payload);
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    inforPost: {},
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
  },
  extraReducers: (builder) => {
    builder.addCase(deletePostById.fulfilled, (action, payload) => {
      //
    });
  },
});
// Action creators are generated for each case reducer function
export const { getInforPost } = postSlice.actions;

export default postSlice.reducer;
