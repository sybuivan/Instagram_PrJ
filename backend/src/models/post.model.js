/* eslint-disable */
const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = mongoose.Schema({
  images: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  user_follow: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Follow',
  },
  caption: {
    type: String,
  },

  commnets: [
    {
      user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      user_commnet: {
        type: String,
      },
    },
  ],
  saved: [
    {
      post_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post',
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
  },
});

const post = mongoose.model('post', postSchema);

module.exports = post;
