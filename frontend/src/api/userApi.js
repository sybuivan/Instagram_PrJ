import axiosClient from './axiosClient';
import { getUserId } from '../utils';
const categoryApi = {
  getUser() {
    const userId = getUserId();
    const user = axiosClient.get(`/users/${userId}`);
    return user;
  },
  async editAvatar(formData) {
    const userId = getUserId();
    await axiosClient.put(`/users/edit-avatar/${userId}`, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },

  async getSuggetionsForUser() {
    const userId = getUserId();
    const listUser = axiosClient.get(`/users/get-suggetions-friend/${userId}`);
    return listUser;
  },
};

export default categoryApi;
