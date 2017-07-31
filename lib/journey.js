var Ticket = require("./ticket");
var config = require("./config");
var moment = require("moment");

function City(data) {
	this.cityName = data.cityName;
	this.cityId = data.cityId;
	this.stopName = data.stopName;
	this.stopId = data.stopId;
}

City.prototype.toString = function() {
	return this.cityName;
};

function _formatTime(date) {
	return moment(date).format(config.TIME_FORMAT);
}

function Journey(data, date) {
	this.journeyId = data.journeyId;
	this.date = moment(date).format(config.LONG_DATE_FORMAT);
	this.arrivalDateTime = _formatTime(data.arrivalDateTime);
	this.departureDateTime = _formatTime(data.departureDateTime);
	this.duration = data.duration;
	this.price = data.price;
	this.origin = new City(data.origin);
	this.destination = new City(data.destination);
	this.legs = data.legs.map(function(leg) {
		return new JourneyLeg(leg);
	});
	this.promotionCodeStatus = data.promotionCodeStatus;
	this.cheapestPrice = data.cheapestPrice;
	this.routeName = data.routeName;
	this.lowStockCount = data.lowStockCount;
}

Journey.prototype.getTicket = function() {
	return new Ticket(this);
};

function JourneyLeg(data) {
	this.carrier = data.carrier;
	this.transportTypeId = data.transportTypeId;
	this.departureDateTime = data.departureDateTime;
	this.arrivalDateTime = data.arrivalDateTime;
	this.duration = data.duration; //"PT7H15M";
	this.origin = new City(data.origin);
	this.destination = new City(data.destination);
}

module.exports = Journey;
