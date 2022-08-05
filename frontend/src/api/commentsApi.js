import { getUserId } from '../utils';
import axiosClient from './axiosClient';

const commentsApi = {
  createComment(formData) {
    const comment = axiosClient.post('/comments/create', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    return comment;
  },
  async deleteComment(idComment) {
    await axiosClient.delete(`/comments/delete-comment/${idComment}`);
  },
  async getCommentById(idComment) {
    const comment = await axiosClient.get(
      `/comments/get-comment-id/${idComment}`
    );
    return comment;
  },
  async editComment(objectValue) {
    const comment = await axiosClient.put(
      '/comments/edit-comment-id',
      objectValue
    );
    return comment;
  },
};

export default commentsApi;
