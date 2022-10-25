const { Server } = require('socket.io');

const connectSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  return io;
};

module.exports = connectSocket;
