import path from "path";
// const { port, allowedOrigins } = require('config');
// const { Server } = require('http');
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import debugFunc from "debug";

const debug = debugFunc("server");

// const SocketLib = require('./socketlib');
// const dblib = require('./dblib');
// const apiHandler = require('./apiHandler');

const config = {
	port: 3001,
	allowedOrigins: ["localhost:3000"]
}

const server = express();

server.use(cors({
	origins: config.allowedOrigins
}));
server.use(bodyParser.json());

server.get("/api/:controller/:action", (request, response) => {
	new apiHandler(request, response);
});
server.post("/api/:controller/:action", (request, response) => {
	new apiHandler(request, response);
});

server.listen(config.port, () => {
	debug(`Server Listening on localhost:${config.port}`);
});

