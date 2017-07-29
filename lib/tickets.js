var moment = require("moment");
var config = require("config");

function Ticket(data) {
	this.origin = data.origin;
	this.destination = data.destination;
	this.date = data.date;
	this.departureTime = data.departureTime;
	this.arrivalTime = data.arrivalTime;
	this.price = data.price;
}

Ticket.prototype.toString = function() {
	return "{$" + this.price + "} " + this.origin + " -> " + this.destination + " (" + moment(this.date).format(config.DATE_FORMAT) + " " +
		(moment(this.departureTime).format(config.TIME_FORMAT) + " - " + moment(this.arrivalTime).format(config.TIME_FORMAT) + ")");
};
