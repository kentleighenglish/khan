const path = require("path");
// const { port, allowedOrigins } = require('config');
const { Server } = require('http');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const debugFunc = require("debug");
const config = require("config");

const { server: serverConfig } = config;

const debug = debugFunc("server:core");

const io = require("./socket");

// const dblib = require('./dblib');
// const apiHandler = require('./apiHandler');

const server = Server();

const app = express(server);

io(server);

app.use(cors({
	origins: serverConfig.allowedOrigins
}));
app.use(bodyParser.json());

server.listen(serverConfig.port, () => {
	debug(`Server Listening on localhost:${serverConfig.port}`);
});

