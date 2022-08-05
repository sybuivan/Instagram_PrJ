import { commentsApi } from '../api';
import { getUserId } from '../utils';

export default async function postComment(idPost, comments) {
  try {
    const comment = await commentsApi.createComment({
      post_id: idPost,
      user_id: getUserId(),
      comment: comments,
    });
  } catch (error) {}
}
