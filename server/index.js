const path = require("path");
// const { port, allowedOrigins } = require('config');
const { Server } = require('http');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const debugFunc = require("debug");
const config = require("config");

const debug = debugFunc("server:core");

const io = require("./socket");

// const dblib = require('./dblib');
// const apiHandler = require('./apiHandler');

const server = Server();

const app = express(server);

io(server);

app.use(cors({
	origin: config.cors.origins.split(','),
	methods: config.cors.methods.split(','),
	credentials: true
}));
app.use(bodyParser.json());

server.listen(config.server.port, () => {
	debug(`Server Listening on localhost:${config.server.port}`);
});

