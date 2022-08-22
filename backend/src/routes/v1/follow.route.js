/* eslint-disable */
const express = require('express');
const { followController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const validate = require('../../middlewares/validate');

const router = express.Router();
router.post('/add-follow', followController.addFollow);
router.get('/get-friend/:userName', followController.getFollows);
router.get('/get-friends-me/:userName', followController.getFollowsMe);
router.put('/unfollow-friends', followController.unFollowUser);
module.exports = router;
