var locations = require("./locations");

function Route(org, dest) {
	this.origin = org;
	this.originId = locations[org.toUpperCase()].id;
	this.destination = dest;
	this.destinationId = locations[dest.toUpperCase()].id;
}

// TODO make detection of city better

module.exports = Route;
