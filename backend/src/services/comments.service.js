/* eslint-disable */
const httpStatus = require('http-status');
const { Comments, Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createCommnet = async (body, file) => {
  const objectValue = { ...body };
  const comment = await Comments.create(objectValue);
  return comment;
};

const getCommentById = async (idComment) => {
  const comment = await Comments.findById(idComment);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'comment not found');
  }
  return comment;
};
const deleteComment = async (idComment) => {
  const comment = await Comments.findById(idComment);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'comment not found');
  }
  await comment.remove();
};
const editCommentById = async (updateBody) => {
  const comment = await Comments.findById(updateBody._id);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'comment not found');
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};
module.exports = { createCommnet, deleteComment, getCommentById, editCommentById };
