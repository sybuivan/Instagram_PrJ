/* eslint-disable */
const httpStatus = require('http-status');
const { Comments, Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createCommnet = async (body, file) => {
  const objectValue = { ...body };
  const comment = await Comments.create(objectValue);
  return comment;
};

const getComments = async (postId, commentId) => {
  const posted = await Post.findById(postId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
  }
};
module.exports = { createCommnet };
