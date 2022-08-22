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
    const { follows, user } = await axiosClient.get(
      `/follow/get-friend/${userName}`
    );
    const follow_with_me = follows[0].followere.find(
      (user) => user.id === getUserId()
    );
    return { follows: follows, user: user, follow_with_me: !!follow_with_me };
  },
  async getFriendsMe(userName) {
    const friends = await axiosClient.get(`/follow/get-friends-me/${userName}`);
    return friends;
  },
  async unFollowUser(params) {
    const friends = await axiosClient.put('/follow/unfollow-friends', {
      params: params,
    });
    return friends;
  },
};

export default followApi;
