/* eslint-disable */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  console.log(req.file);
  const post = await postService.createPost(req.body, req.file.filename);
  res.status(httpStatus.CREATED).send({ post });
});
const getPostAll = catchAsync(async (req, res) => {
  const { newList, follows } = await postService.getPostAll(req.params.userName);
  res.send({ newList, follows });
});

const getPostFriend = catchAsync(async (req, res) => {
  const { newList } = await postService.getPostFriend(req.params.userId);
  res.send({ newList });
});

const getPostById = catchAsync(async (req, res) => {
  const { posted, comments } = await postService.getPostById(req.params.postId);
  res.send({ posted, comments });
});
const deletePostById = catchAsync(async (req, res) => {
  await postService.deletePostById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPost,
  getPostAll,
  getPostFriend,
  getPostById,
  deletePostById,
};
