/* eslint-disable */
const mongoose = require('mongoose');
const validator = require('validator');

const commentsSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    post_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Commnets',
      required: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const comments = mongoose.model('Comments', commentsSchema);

module.exports = comments;
