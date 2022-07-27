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
  const { newList } = await postService.getPostAll(req.params.userName);
  res.send({ newList });
});
const getPostFriend = catchAsync(async (req, res) => {
  const { newList } = await postService.getPostFriend(req.params.userId);
  res.send({ newList });
});

module.exports = {
  createPost,
  getPostAll,
  getPostFriend,
};
