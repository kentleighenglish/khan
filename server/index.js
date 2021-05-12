import path from "path";
// const { port, allowedOrigins } = require('config');
// const { Server } = require('http');
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import debugFunc from "debug";
import config from "config";

const { server: serverConfig } = config;

const debug = debugFunc("server:core");

// const SocketLib = require('./socketlib');
// const dblib = require('./dblib');
// const apiHandler = require('./apiHandler');

const server = express();

server.use(cors({
	origins: serverConfig.allowedOrigins
}));
server.use(bodyParser.json());

server.get("/api/:controller/:action", (request, response) => {
	new apiHandler(request, response);
});
server.post("/api/:controller/:action", (request, response) => {
	new apiHandler(request, response);
});

server.listen(serverConfig.port, () => {
	debug(`Server Listening on localhost:${serverConfig.port}`);
});

