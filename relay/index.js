const config = require("config");
const rfInterface = require("./rfInterface");
const Datastore = require('nedb');
const path = require('path');

const APP_DIR = __dirname;

//Datastore
var db = {};
db.metadata = new Datastore(path.join(APP_DIR, 'datastores', 'metadata.db'));

db.metadata.loadDatabase();

const io = require('socket.io-client');
var relayData = {};

function init() {
	db.metadata.find({}, function(err, res){
		console.log("Metadata loaded");

		res.map(function(property) {
			relayData[property.name] = property.value;
		});


		var socket = io(`ws://${config.socket.host}`, {
			path: config.socket.path,
			query: {
				type: 'relay',
				id: config.relay.hardwareId,
				data: JSON.stringify(relayData)
			}
		});


		socket.on('connect', function (socket) {
		    console.log('Successfully Connected to '+config.socket.host);
		});

		socket.on('disconnect', function() {
			console.log("Disconnected from "+config.socket.host)
		})

		socket.on('reconnect_attempt', () => {
			socket.io.opts.query = {
				type: 'relay',
				id: config.relay.hardwareId,
				data: JSON.stringify(relayData)
			}
		});

		socket.on('msgRelay', function(data) {
			delete data.recipient;

			console.log("Received Message. Broadcasting...");
			rf = new rfInterface(APP_DIR);
			rf.broadcast(data,
			function(response) {
				console.log("Message sent. Response:", response);
				socket.emit('msgRelayResponse', {success: true, data: response, errors: []});
			},
			function(error) {
				console.log('Error occurred: ', error);
				socket.emit('msgRelayResponse', {success: false, data: null, errors: [error]});
			});
		});

		socket.on('updateRelay', function(data) {
			//Update or add new metadata to relay
			console.log(data);

			socket.emit('updateRelayResponse', {success: true, data: relayData});
		});
	});
}

init();
