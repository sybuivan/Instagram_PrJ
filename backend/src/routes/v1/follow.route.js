/* eslint-disable */
const express = require('express');
const { followController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const validate = require('../../middlewares/validate');

const router = express.Router();
router.post('/add-follow/:userId/:userFriend', followController.addFollow);
router.get('/get-friend/:userId', followController.getFollows);
module.exports = router;
