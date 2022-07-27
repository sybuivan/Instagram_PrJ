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

  const newList = listPost.filter((item) => item.user.userName === userName);
  return { newList };
};

const getPostFriend = async (user) => {
  const listFriend = await Follow.find({})
    .populate({
      path: 'user',
    })
    .populate({ path: 'following' })
    .select('following');
  const listPost = await Post.find({}).populate({ path: 'user' }).populate({ path: 'user_follow' }).sort({ created_at: -1 });
  let newList = [];
  for (const itemList of listFriend) {
    for (const iterator of itemList.following) {
      newList = listPost.filter((item) => item.user.userName === user || item.user.userName === iterator.userName);
    }
  }

  return { newList };
};

module.exports = { createPost, getPostAll, getPostFriend };
