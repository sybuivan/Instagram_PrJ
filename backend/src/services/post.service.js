/* eslint-disable */
const httpStatus = require('http-status');
const { Post, Follow, Comments, Likes } = require('../models');
const { getFollows, getFollowsMe } = require('./follow.service');
const ApiError = require('../utils/ApiError');

const createPost = async (body, file) => {
  const isodate = new Date().toISOString();
  const objectValue = { ...body, images: file, created_at: isodate };
  const product = await Post.create(objectValue);
  return product;
};
const deletePostById = async (idPost) => {
  const post = await Post.findById(idPost);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
  }
  await post.remove();
};

const editPostById = async (body, id) => {
  const posted = await Post.findById(id);
  console.log(posted, id);
  if (!posted) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  Object.assign(posted, body);
  await posted.save();
  return posted;
};
const getPostById = async (id) => {
  const posted = await Post.findById(id).populate({ path: 'user' });
  const comments = await Comments.find({ post_id: id }).populate({ path: 'user_id' });
  const totalComments = await Comments.find({ post_id: id }).populate({ path: 'user_id' }).countDocuments();
  const totalLikes = await Likes.find({ post_id: id }).populate({ path: 'user_id' }).countDocuments();
  return {
    posted,
    comments,
    totalComments,
    totalLikes,
  };
};
const getPostAll = async (userName) => {
  const listPost = await Post.find({}).populate({ path: 'user' }).select('_id');
  const follows = await getFollowsMe(userName);
  let newList = [];
  const newPostId = listPost.filter((item) => item.user?.userName === userName);

  for (const id of newPostId) {
    const { posted, totalComments, totalLikes } = await getPostById(id);
    newList.push({ posted, totalComments, totalLikes });
  }
  return { newList, follows };
};

const getPostFriend = async (user) => {
  const listFriend = await Follow.find({ userName: user })
    .populate({
      path: 'user',
    })
    .populate({ path: 'following' })
    .select('following');
  listFriend[0].following.unshift(listFriend[0].user);
  // empty people following
  if (listFriend[0].following.length === 0) {
    const newList = await Post.find({})
      .populate({ path: 'user' })
      .populate({ path: 'user_follow' })
      .sort({ created_at: -1 });
    return { newList };
  } else {
    let newPostId = [];
    let newList = [];

    for (const iterator of listFriend[0].following) {
      const newPostFriend = await Post.find({ user: iterator._id }).select('_id').sort({ created_at: -1 });
      newPostId.push(...newPostFriend);
    }
    for (const id of newPostId) {
      const posted = await getPostById(id);
      newList.push({ ...posted });
    }
    return { newList };
  }
};

module.exports = { createPost, getPostAll, getPostFriend, getPostById, deletePostById, editPostById };
