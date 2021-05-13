const io = require("socket.io");
const config = require("config");
const debugFunc = require("debug");

const debug = debugFunc("socket:server");

const hookEvents = (socketIO) => {
	socketIO.on('connect', (socket) => {
		const { handshake: { query } } = socket;

		if (query && query.user) {
			const user = JSON.parse(query.user);

			if (user) {
				debug(`User Connected: ${user.email}`);
			}
		}
	});
};

module.exports = (server) => {
	const socketIO = io(server, {
		path: config.socket.path
	});
	
	hookEvents(socketIO);
	
	return socketIO;
};