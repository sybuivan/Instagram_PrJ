import { getUserId } from '../utils';
import axiosClient from './axiosClient';

const commentsApi = {
  createComment(formData) {
    const comment = axiosClient.post('/comments/create', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    return comment;
  },
};

export default commentsApi;
