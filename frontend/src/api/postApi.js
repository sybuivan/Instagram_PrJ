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
    console.log('API', newList);
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
};

export default postApi;
