/* eslint-disable */
const httpStatus = require('http-status');
const io = require('..');
const server = require('..');
const logger = require('../config/logger');
const { messageService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getListMessageUser = catchAsync(async (req, res) => {
  const { user, messages } = await messageService.getListMessageUser(req.params.idUser);
  res.send({ messages, user });
});

const chatMessage = catchAsync(async (req, res) => {
  const listMessage = await messageService.chatMessage(req.body);
  console.log(listMessage);
  res.send(listMessage);
});
module.exports = {
  // listenSocket,
  chatMessage,
  getListMessageUser,
};
