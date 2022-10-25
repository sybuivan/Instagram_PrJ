const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const connectSocket = require('./config/server');

let server;
let io;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  io = connectSocket(server);
  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      console.log(data);
      logger.info(`User Connected: ${socket.id}`);
    });
    socket.on('send-msg', (data) => {
      logger.info(`User: ${socket.id}`);
      io.to(socket.id).emit('msg-recieve', { text: data.textMessage });
    });
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

module.exports = io;
