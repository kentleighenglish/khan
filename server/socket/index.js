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
      debug("Relay connected", JSON.stringify(query));

      socket.join("relays");
    } else if (query?.type === "app") {
      debug("App connected", JSON.stringify(query));

      socket.on("updateRelay", (data) => {
        const hardwareId = "000000";
        const payload = data.value ? 1 : 0;

        socketIO.to("relays").emit("msgRelay", { hardwareId, payload })
      });
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
