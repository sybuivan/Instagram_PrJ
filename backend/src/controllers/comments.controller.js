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

module.exports = {
  createComment,
  getComments,
};
