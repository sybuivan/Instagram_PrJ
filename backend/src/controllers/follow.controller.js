/* eslint-disable */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { followService } = require('../services');

const addFollow = catchAsync(async (req, res) => {
  console.log(req.body);
  const friend = await followService.addFollow(req.body.user, req.body.idFriend);
  res.status(httpStatus.CREATED).send({ friend });
});
const getFollows = catchAsync(async (req, res) => {
  const { follows, user } = await followService.getFollows(req.params.userName);
  res.send({ follows, user });
});
module.exports = {
  addFollow,
  getFollows,
};
