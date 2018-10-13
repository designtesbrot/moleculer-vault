"use strict";

const path = require("path");
let {ServiceBroker} = require("moleculer");

// Create broker
let broker = new ServiceBroker({
	logger: console,
});

// Load services
broker.loadService(path.join(__dirname,'vault.service.js'));
broker.loadService(path.join(__dirname,'api.service.js'));

// Start server
broker.start().then(() => broker.repl());
