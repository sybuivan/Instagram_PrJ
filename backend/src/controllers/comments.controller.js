/* eslint-disable */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentsService } = require('../services');

const createComment = catchAsync(async (req, res) => {
  const comment = await commentsService.createCommnet(req.body);
  res.status(httpStatus.CREATED).send({ comment });
});

const getComments = catchAsync(async (req, res) => {
  const listComments = await commentsService.getComments(req.params.postId);
  res.send({ listComments });
});
const deleteComment = catchAsync(async (req, res) => {
  await commentsService.deleteComment(req.params.idComment);
  res.status(httpStatus.NO_CONTENT).send();
});
const getCommentById = catchAsync(async (req, res) => {
  const commnet = await commentsService.getCommentById(req.params.idComment);
  res.send(commnet);
});
const editCommentById = catchAsync(async (req, res) => {
  const commnet = await commentsService.editCommentById(req.body);
  res.send(commnet);
});

module.exports = {
  createComment,
  getComments,
  deleteComment,
  getCommentById,
  editCommentById,
};
