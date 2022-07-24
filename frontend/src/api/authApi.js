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
};

export default categoryApi;
