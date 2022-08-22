/* eslint-disable */
const httpStatus = require('http-status');
const { ObjectId } = require('mongodb');
const { Follow, User } = require('../models');
const ApiError = require('../utils/ApiError');

const addFollow = async (userId, userFriend) => {
  const countFollowing = await Follow.find({ user: userId }).select('following');
  const countFollowere = await Follow.find({ user: userFriend }).select('followere');
  const following = await Follow.find({ user: userId }).select('following');
  const followere = await Follow.find({ user: userId }).select('followere');
  if (countFollowing[0].following.length > 0) {
    following[0].following.push(userFriend);
    await Follow.findOneAndUpdate({ user: userId }, { following: following[0].following });
  } else {
    await Follow.findOneAndUpdate({ user: userId }, { following: [userFriend] });
  }

  if (countFollowere[0].followere.length > 0) {
    console.log(followere[0]);
    followere[0].followere.push(userId);
    await Follow.findOneAndUpdate({ user: userFriend }, { followere: followere[0].followere });
  } else {
    await Follow.findOneAndUpdate({ user: userFriend }, { followere: [userId] });
  }
};

const getFollows = async (userName) => {
  const follows = await getFollowsMe(userName);
  const user = await User.findById(follows[0].user);
  return { follows, user };
};

const getFollowsMe = async (userName) => {
  const friends = await Follow.find({ userName: userName }).populate({ path: 'following' }).populate({ path: 'followere' });
  return friends;
};

const unFollowUser = async (params) => {
  let id = ObjectId(params.idFollow);
  let member = ObjectId(params.idMember);
  let idUser = ObjectId(params.idUser);
  let populateQuery = [{ path: 'following', select: '_id' }];
  await Follow.findOneAndUpdate(
    { _id: id },
    {
      $pull: { following: member },
    },
    { new: true, useFindAndModify: false, multi: true }
  ).populate(populateQuery);
  await Follow.findOneAndUpdate(
    { user: member },
    {
      $pull: { followere: idUser },
    },
    { new: true, useFindAndModify: false, multi: true }
  ).populate({ path: 'followere', select: '_id' });
};
module.exports = { addFollow, getFollows, getFollowsMe, unFollowUser };
