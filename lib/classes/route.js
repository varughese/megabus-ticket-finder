var locations = require("../locations/idmap");

function Route(org, dest) {
	var originCity = _getCity(org),
		destCity = _getCity(dest);

	if(!originCity) throw `The origin city: ${org} is not recognized`;
	if(!destCity) throw `The destination city: [${dest}] is not recognized`;

	this.origin = originCity.name;
	this.originId = originCity.id;
	this.destination = destCity.name;
	this.destinationId = destCity.id;
}

function _getCity(name) {
	if(!name) throw "No city name or id was given!";
	name = _normalizeName(name);
	var c = locations[name.toUpperCase()];
	return typeof c === "string" ? locations[c] : c;
}

function _normalizeName(name) {
	if(!isNaN(name)) return ""+name;
	return name.toUpperCase();
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
