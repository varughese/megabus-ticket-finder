var locations = require("./locations");

function Route(org, dest) {
	this.origin = org;
	this.originId = locations[org.toUpperCase()].id;
	this.destination = dest;
	this.destinationId = locations[dest.toUpperCase()].id;
}

Route.prototype.swap = function() {
	var origin = this.origin;
	var originId = this.originId;

	this.origin = this.destination;
	this.originId = this.destinationId;

	this.destination = origin;
	this.destinationId = originId;

	return this;
};

// TODO make detection of city better

module.exports = Route;
