/* eslint-disable */
const httpStatus = require('http-status');
const { Likes } = require('../models');
const ApiError = require('../utils/ApiError');

const createHeart = async (body) => {
  const likeUser = await Likes.findOne({ user_id: body.user_id, post_id: body.post_id });
  if (!likeUser) {
    const objectValue = { ...body };
    const like = await Likes.create(objectValue);
    return like;
  }
};

const deleteHeart = async (query) => {
  const likeUser = await Likes.findOne({ user_id: query.userId, post_id: query.postId });
  if (!likeUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Like post not found');
  }

  await likeUser.remove();
};
const checkLikeHeart = async (query) => {
  let isHeart = true;
  const likeUser = await Likes.findOne({ user_id: query.userId, post_id: query.postId });
  if (!likeUser) {
    isHeart = false;
  }

  return {
    isHeart: isHeart,
  };
};

const getUserLikes = async (postId) => {
  const listUser = await Likes.find({ post_id: postId }).populate('user_id');
  return listUser;
};

module.exports = { createHeart, deleteHeart, checkLikeHeart, getUserLikes };
