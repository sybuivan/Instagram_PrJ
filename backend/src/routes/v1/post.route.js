/* eslint-disable */
const express = require('express');
const { postController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const validate = require('../../middlewares/validate');

const router = express.Router();
router.post('/create', upload.single('images'), postController.createPost);
router.get('/get-all/:userId', postController.getPostAll);
module.exports = router;
