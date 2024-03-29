/* eslint-disable */
const express = require('express');
const { postController, commentsController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const validate = require('../../middlewares/validate');

const router = express.Router();
router.post('/create', commentsController.createComment);
router.delete('/delete-comment/:idComment', commentsController.deleteComment);
router.get('/get-comment-id/:idComment', commentsController.getCommentById);
router.put('/edit-comment-id', commentsController.editCommentById);
// router.get('/get-all/:userName', postController.getPostAll);
// router.get('/get-all-friend/:userId', postController.getPostFriend);
module.exports = router;
