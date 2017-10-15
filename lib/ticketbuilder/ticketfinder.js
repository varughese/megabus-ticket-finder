const config = require("../config");
const moment = require("moment");

const setDateHelpers = require("../helpers/set-date-helpers");
const getTickets = require("./gettickets");

function TicketFinder(dateOpts, routes) {
	var THIS = this;

	this._dateOpts = dateOpts;
	this._tickets = [];
	this._payload = {};
	this._skippedDates = [];

	this.routes = routes;
	this.startDate = setDateHelpers.getStartDate(dateOpts);
	this.endDate = setDateHelpers.getEndDate(dateOpts, THIS);
	this.totalPassengers = dateOpts.totalPassengers || 1;


	this.getTicketsInPriceRange = _getTicketsInPriceRange;

	this.findTickets = function() {
		return THIS.endDate
			.then(getTickets.bind(THIS));
	};


	function _getTicketsInPriceRange(min, max) {
		return THIS.findTickets()
			.then(function(tickets) {
				THIS._payload.tickets = THIS._tickets.filter(function(ticket) {
					return ticket.price >= min && ticket.price <= max;
				});
				return THIS._payload;
			});
	}
}

module.exports = TicketFinder;
