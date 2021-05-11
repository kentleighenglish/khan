const io = require('socket.io');
const config = require('config');

class SocketLib {

	constructor(server) {
		this.socket = io(server, {
			path: config.socket.path
		});

		this.hookEvents();
	}

	hookEvents() {
		this.socket.on('connect', (socket) => {
			const { handshake: { query } } = socket;

			if (query && query.user) {
				const user = JSON.parse(query.user);

				if (user) {
					this.connectUser(socket, user);
				}
			}
		})
	}

	connectUser(socket, user) {
		console.log(`[Socket] User Connected: ${user.email}`);
	}

	connectController(socket, controller) {

	}
}

module.exports = SocketLib;