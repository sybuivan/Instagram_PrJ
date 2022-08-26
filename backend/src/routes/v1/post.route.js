/* eslint-disable */
const express = require('express');
const { postController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const validate = require('../../middlewares/validate');

const router = express.Router();
router.post('/create', upload.single('images'), postController.createPost);
router.get('/get-all/:userName', postController.getPostAll);
router.get('/get-all-friend/:userId', postController.getPostFriend);
router.get('/get-post-id/:postId', postController.getPostById);
router.delete('/delete-post-id/:postId', postController.deletePostById);
router.put('/edit-post-id/:id', postController.editPostById);
module.exports = router;
