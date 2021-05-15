const io = require("socket.io");
const config = require("config");
const debugFunc = require("debug");

const debug = debugFunc("socket:server");

const hookEvents = (socketIO) => {
  socketIO.on('connect', (socket) => {
    const { handshake: { query } } = socket;
    debug("Remote connection");

    if (query && query.user) {
      const user = JSON.parse(query.user);

      if (user) {
        debug(`User Connected: ${user.email}`);
      }
    }

    if (query?.type === "relay") {

    }
  });
};

module.exports = (server) => {
  const socketIO = io(server, {
    path: config.socket.path,
    cors: {
      origin: config.cors.origins.split(','),
      methods: config.cors.methods.split(','),
    }
  });

  hookEvents(socketIO);

  return socketIO;
};
