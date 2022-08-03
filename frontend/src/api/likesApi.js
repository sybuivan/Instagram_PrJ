import axiosClient from './axiosClient';

const createHeart = {
  async createHeart(formData) {
    const heart = await axiosClient.post('/likes/create-heart', formData);
    return heart;
  },
  async checkIsHeartPost(query) {
    const isHeart = await axiosClient.get('/likes/check-like-heart', {
      params: query,
    });
    return isHeart;
  },
  async unLikePost(query) {
    await axiosClient.delete('/likes/un-like', {
      params: query,
    });
  },

  async getUserLikes(postId) {
    const listUsers = axiosClient.get(`/likes/get-list-user-like/${postId}`);
    return listUsers;
  },
};

export default createHeart;
