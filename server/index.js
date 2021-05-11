const path = require('path');
const { port, allowedOrigins } = require('config');
const { Server } = require('http');
const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const SocketLib = require('./socketlib');
const dblib = require('./dblib');
const apiHandler = require('./apiHandler');

class ServerClass {

	constructor() {
		this.app = new Express();
		this.server = new Server(this.app);
		this.socket = new SocketLib(this.server);

		this.appInit();

		this.start();

		dblib.init();
	}

	appInit() {
		this.app.use(cors({
			origins: allowedOrigins
		}));
		this.app.use(bodyParser.json());

		this.app.get('/api/:controller/:action', (request, response) => {
			new apiHandler(request, response);
		});
		this.app.post('/api/:controller/:action', (request, response) => {
			new apiHandler(request, response);
		});
	}

	start() {
		this.server.listen(port, function () {
			console.log('\n[Khan Server Live]');
			console.log(`Listening on *:${port}`);
		});
	}
}

const server = new ServerClass();