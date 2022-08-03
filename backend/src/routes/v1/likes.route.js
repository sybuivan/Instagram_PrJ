/* eslint-disable */
const express = require('express');
const { likesController } = require('../../controllers');

const router = express.Router();
router.post('/create-heart', likesController.createHeart);
router.delete('/un-like', likesController.deleteHeart);
router.get('/check-like-heart', likesController.checkLikeHeart);
router.get('/get-list-user-like/:postId', likesController.getUserLikes);
module.exports = router;
