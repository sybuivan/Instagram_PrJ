/* eslint-disable */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { followService } = require('../services');

const addFollow = catchAsync(async (req, res) => {
  const friend = await followService.addFollow(req.params.userId, req.params.userFriend);
  res.status(httpStatus.CREATED).send({ friend });
});
const getFollows = catchAsync(async (req, res) => {
  const { follows, user } = await followService.getFollows(req.params.userId);
  res.send({ follows, user });
});
module.exports = {
  addFollow,
  getFollows,
};
