/* eslint-disable */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentsService, likesService } = require('../services');

const createHeart = catchAsync(async (req, res) => {
  const heart = await likesService.createHeart(req.body);
  res.status(httpStatus.CREATED).send({ heart });
});

const deleteHeart = catchAsync(async (req, res) => {
  await likesService.deleteHeart(req.query);
  res.send({ msg: 'DELETE SUCC' });
});
const checkLikeHeart = catchAsync(async (req, res) => {
  const { isHeart } = await likesService.checkLikeHeart(req.query);
  res.send({ isHeart });
});
const getUserLikes = catchAsync(async (req, res) => {
  const listUser = await likesService.getUserLikes(req.params.postId);
  res.send({ listUser });
});

module.exports = {
  createHeart,
  deleteHeart,
  checkLikeHeart,
  getUserLikes,
};
