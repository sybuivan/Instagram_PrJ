/* eslint-disable */
const httpStatus = require('http-status');
const { Follow, User } = require('../models');
const ApiError = require('../utils/ApiError');

const addFollow = async (userId, userFriend) => {
  const countFollowing = await Follow.find({ user: userId }).countDocuments();
  const follows = await Follow.find({ user: userId }).select('following');
  if (countFollowing > 0) {
    follows[0].following.push(userFriend);
    console.log(follows[0].following);
    return await Follow.findOneAndUpdate({ user: userId }, { following: follows[0].following });
  } else {
    return await Follow.create({ user: userId, following: [userFriend] });
  }
};

const getFollows = async (userName) => {
  const follows = await Follow.find({ userName: userName }).populate({ path: 'following' });
  const user = await User.findById(follows[0].user);
  return { follows, user };
};

module.exports = { addFollow, getFollows };
