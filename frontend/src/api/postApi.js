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
    const { newList } = await axiosClient.get(`/post/get-all/${userName}`);
    return { newList };
  },
  async getPostAllFriend(userName) {
    const { newList } = await axiosClient.get(
      `/post/get-all-friend/${userName}`
    );
    return { newList };
  },
};

export default postApi;
