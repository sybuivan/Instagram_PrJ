/* eslint-disable */
const express = require('express');
const { messageController } = require('../../controllers');

const router = express.Router();
router.get('/:idUser', messageController.getListMessageUser);
router.post('/chat-message', messageController.chatMessage);

module.exports = router;
