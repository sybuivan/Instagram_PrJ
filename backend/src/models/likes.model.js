/* eslint-disable */
const mongoose = require('mongoose');
const validator = require('validator');

const likesSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    post_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const likes = mongoose.model('Likes', likesSchema);

module.exports = likes;
