import { getUserId } from '../utils';
import axiosClient from './axiosClient';

const followApi = {
  addFriend(formData) {
    const post = axiosClient.post('/post/create', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    return post;
  },
  async getFollowUser() {
    const userId = getUserId();

    const follows = await axiosClient.get(`/follow/get-friend/${userId}`);
    return follows;
  },
};

export default followApi;
