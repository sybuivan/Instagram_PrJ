/* eslint-disable */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { followService } = require('../services');

const addFollow = catchAsync(async (req, res) => {
  const friend = await followService.addFollow(req.body.user, req.body.idFriend);
  res.status(httpStatus.CREATED).send({ friend });
});
const getFollows = catchAsync(async (req, res) => {
  const { follows, user } = await followService.getFollows(req.params.userName);
  res.send({ follows, user });
});
const getFollowsMe = catchAsync(async (req, res) => {
  const friends = await followService.getFollowsMe(req.params.userName);
  res.send({ friends });
});
const unFollowUser = catchAsync(async (req, res) => {
  await followService.unFollowUser(req.body.params);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  addFollow,
  getFollows,
  getFollowsMe,
  unFollowUser,
};
