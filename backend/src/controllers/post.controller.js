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
  console.log(req.params.userId);
  const { listPost, total } = await postService.getPostAll(req.params.userId);
  res.send({ listPost, total });
});

module.exports = {
  createPost,
  getPostAll,
};
