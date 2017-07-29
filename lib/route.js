var locations = require("./locations");
var ticket = require("./ticket");


function Route(org, dest) {
	this.origin = org;
	this.originId = locations[org.toUpperCase()];
	this.destination = dest;
	this.destinationId = locations[dest.toUpperCase()];
}

// TODO make detection of city better
