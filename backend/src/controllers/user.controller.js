const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const editAvatar = catchAsync(async (req, res) => {
  const user = await userService.editAvatar(req.params.userId, req.file.filename);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getSuggestionsForUser = catchAsync(async (req, res) => {
  const { listUserSuggets } = await userService.getSuggestionsForUser(req.params.userId);
  res.send({ listUserSuggets });
});

const findUsers = catchAsync(async (req, res) => {
  const listResult = await userService.findUsers(req.params.userName);
  res.send({ listResult });
});

const editProfile = catchAsync(async (req, res) => {
  const user = await userService.editProfile(req.body);
  res.send({ user });
});
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  editAvatar,
  getSuggestionsForUser,
  findUsers,
  editProfile,
};
