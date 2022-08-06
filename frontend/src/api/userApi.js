import axiosClient from './axiosClient';
import { getUserId } from '../utils';
const categoryApi = {
  async getUser(userId) {
    const user = await axiosClient.get(`/users/${userId}`);
    return user;
  },
  async editAvatar(formData) {
    const userId = getUserId();
    await axiosClient.put(`/users/edit-avatar/${userId}`, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },

  async getSuggetionsForUser(userId) {
    const listUser = axiosClient.get(`/users/get-suggetions-friend/${userId}`);
    return listUser;
  },
  async findUsers(userSearch) {
    const listResult = await axiosClient.get(`/users/get-search/${userSearch}`);
    return listResult;
  },

  async editProfile(data) {
    const user = await axiosClient.put('/users/edit-profile', data);
    return user;
  },
};

export default categoryApi;
