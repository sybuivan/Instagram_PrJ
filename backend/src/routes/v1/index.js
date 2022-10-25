const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const commentsRoute = require('./comments.route');
const messageRoute = require('./message.route');
const likesRoute = require('./likes.route');
const docsRoute = require('./docs.route');
const followRoute = require('./follow.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/post',
    route: postRoute,
  },
  {
    path: '/follow',
    route: followRoute,
  },
  {
    path: '/comments',
    route: commentsRoute,
  },
  {
    path: '/likes',
    route: likesRoute,
  },
  {
    path: '/messages',
    route: messageRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
