import { getToken } from '../utils';
import axiosClient from './axiosClient';

const categoryApi = {
  registerUser(formData) {
    const user = axiosClient.post('/auth/register', formData);
    return user;
  },
  loginUser(formData) {
    const user = axiosClient.post('/auth/login', formData);
    return user;
  },
  async resetPassword(newPassword) {
    const token = getToken();
    await axiosClient.post('/auth/reset-password', newPassword, {
      params: { token },
    });
  },
};

export default categoryApi;
