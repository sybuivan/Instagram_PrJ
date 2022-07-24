import axiosClient from './axiosClient';
import { getUserId } from '../utils';
const categoryApi = {
  getUser() {
    const userId = getUserId();
    const user = axiosClient.get(`/users/${userId}`);
    return user;
  },
};

export default categoryApi;
