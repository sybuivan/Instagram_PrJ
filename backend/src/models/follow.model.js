/* eslint-disable */
const mongoose = require('mongoose');
const validator = require('validator');

const followSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  followere: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true }],
  following: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true }],
});

const follow = mongoose.model('Follow', followSchema);

module.exports = follow;
