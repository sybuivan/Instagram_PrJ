/* eslint-disable */
const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (body, file) => {
  const isodate = new Date().toISOString();
  const objectValue = { ...body, images: file, created_at: isodate };
  const product = await Post.create(objectValue);
  return product;
};
const getPostAll = async (userId) => {
  const listPost = await Post.find({}).where({ user: userId });
  const total = await Post.countDocuments({ user: userId });
  return { listPost, total };
};

module.exports = { createPost, getPostAll };
