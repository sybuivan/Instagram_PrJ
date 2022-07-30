/* eslint-disable */
const httpStatus = require('http-status');
const { Post, Follow } = require('../models');
const { getFollows } = require('./follow.service');
const ApiError = require('../utils/ApiError');

const createPost = async (body, file) => {
  const isodate = new Date().toISOString();
  const objectValue = { ...body, images: file, created_at: isodate };
  const product = await Post.create(objectValue);
  return product;
};
const getPostAll = async (userName) => {
  const listPost = await Post.find({}).populate({ path: 'user' });

  const newList = listPost.filter((item) => item.user?.userName === userName);
  return { newList };
};

const getPostFriend = async (user) => {
  const listFriend = await Follow.find({ userName: user })
    .populate({
      path: 'user',
    })
    .populate({ path: 'following' })
    .select('following');
  console.log('listFriend', listFriend[0].following.length);
  if (listFriend[0].following.length === 0) {
    console.log('lot 1');
    const newList = await Post.find({})
      .populate({ path: 'user' })
      .populate({ path: 'user_follow' })
      .sort({ created_at: -1 });
    return { newList };
  } else {
    console.log('lot 2');
    let newList = [];

    for (const iterator of listFriend[0].following) {
      const newPostFriend = await Post.find({ user: iterator._id })
        .populate({ path: 'user' })
        .populate({ path: 'user_follow' })
        .sort({ created_at: -1 });
      console.log('newPostFriend', newPostFriend);
      newList.push(...newPostFriend);
    }
    return { newList };
  }
};

module.exports = { createPost, getPostAll, getPostFriend };
