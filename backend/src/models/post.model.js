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
  created_at: {
    type: Date,
  },
});

const post = mongoose.model('post', postSchema);

module.exports = post;
