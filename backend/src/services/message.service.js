/* eslint-disable */
const httpStatus = require('http-status');
const logger = require('../config/logger');
const { Messages, User } = require('../models');
const ApiError = require('../utils/ApiError');

const chatMessage = async (body) => {
  const { idRoom, userId, textMessage } = body;
  const roomChat = await Messages.findById(idRoom);
  console.log(roomChat);
  if (!!roomChat) {
    roomChat.listMessage.push({
      user_id: userId,

      text_message: textMessage,
    });
  }
  await roomChat.save();
  return roomChat;
};

const getListMessageUser = async (idUser) => {
  const messages = await Messages.find({ idUser: idUser });
  const user = await User.find({ _id: idUser });
  if (user) {
    return {
      messages,
      user,
    };
  }
};
module.exports = { chatMessage, getListMessageUser };
