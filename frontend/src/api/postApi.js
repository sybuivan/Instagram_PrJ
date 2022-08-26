import { getUserId } from '../utils';
import axiosClient from './axiosClient';

const postApi = {
  createPost(formData) {
    const post = axiosClient.post('/post/create', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    return post;
  },
  async getPostAll(userName) {
    const { newList, follows } = await axiosClient.get(
      `/post/get-all/${userName}`
    );
    return { newList, follows };
  },

  async getPostAllFriend(userName) {
    const { newList } = await axiosClient.get(
      `/post/get-all-friend/${userName}`
    );
    return { newList };
  },
  async getPostById(id) {
    const { posted, comments } = await axiosClient.get(
      `/post/get-post-id/${id}`
    );
    return { posted, comments };
  },
  async deletePostId(id) {
    await axiosClient.delete(`/post/delete-post-id/${id}`);
  },

  async editPostById(formData, id) {
    const posted = await axiosClient.put(`/post/edit-post-id/${id}`, formData);
    return posted;
  },
};

export default postApi;
