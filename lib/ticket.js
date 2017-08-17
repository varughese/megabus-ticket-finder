/*jshint esversion: 6 */

var moment = require("moment");
var config = require("./config");

function Ticket(data) {
	this.origin = data.origin;
	this.destination = data.destination;
	this.date = data.date;
	this.departureTime = data.departureDateTime;
	this.arrivalTime = data.arrivalDateTime;
	this.price = data.price;
	this.duration = data.duration;
	this.journeyId = data.journeyId;
}

Ticket.prototype.toString = function() {
	return "[" + this.date.format(config.LONG_DATE_FORMAT) + "]   " + "(" +
	this.departureTime.format(config.TIME_FORMAT) + " - " + this.arrivalTime.format(config.TIME_FORMAT) +
	")   " + "[" + this.origin.cityCode + "-->" + this.destination.cityCode + "]   "+"$" + this.price;
};

Ticket.prototype.toJson = function() {
	var oid = this.origin.cityId,
		did = this.destination.cityId;

	return Object.assign({}, this, { origin: oid, destination: did } );
};

Ticket.prototype.toHtml = function() {

	return `<p>
				<b>${this.date.format(config.LONG_DATE_FORMAT)}<b>
				<span class="travel-line travel-line-time">
					${this.departureTime.format(config.TIME_FORMAT)} - ${this.arrivalTime.format(config.TIME_FORMAT)}
				</span>
				<span class="travel-line travel-line-route">
					[${this.origin.cityCode} --> ${this.destination.cityCode}]
				</span>
				<span class="travel-line travel-line-price">
					${this.price}
				</span>
			</p>`;
};

module.exports = Ticket;
