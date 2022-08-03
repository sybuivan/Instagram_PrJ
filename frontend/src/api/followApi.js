import { getUserId } from '../utils';
import axiosClient from './axiosClient';

const followApi = {
  async addFriend(formData) {
    console.log('formData', formData);
    const user = await axiosClient.post('/follow/add-follow', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    return user;
  },
  async getFollowUser(userName) {
    const follows = await axiosClient.get(`/follow/get-friend/${userName}`);
    return follows;
  },
  async getFriendsMe(userName) {
    const friends = await axiosClient.get(`/follow/get-friends-me/${userName}`);
    return friends;
  },
};

export default followApi;
