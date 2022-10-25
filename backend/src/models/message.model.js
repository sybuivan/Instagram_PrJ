/* eslint-disable */
const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = mongoose.Schema(
  {
    idUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    listMessage: [
      {
        type: Object,
        textMessage: {
          type: String,
        },
        clientId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model('Messages', messageSchema);

module.exports = message;
