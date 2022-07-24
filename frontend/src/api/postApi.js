import { getUserId } from '../utils';
import axiosClient from './axiosClient';

const postApi = {
  createPost(formData) {
    const post = axiosClient.post('/post/create', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    return post;
  },
  async getPostAll() {
    const userId = getUserId();

    console.log(userId);
    const { listPost, total } = await axiosClient.get(
      `/post/get-all/${userId}`
    );
    return { listPost, total };
  },
};

export default postApi;
