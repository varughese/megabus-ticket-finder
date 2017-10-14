const config = require("../config");
const moment = require("moment");
const Ticket = require("../classes/ticket");
const requester = require("../helpers/requester");
const Journey = require("../classes/journey");

const setDateHelpers = require("../helpers/set-date-helpers");
const _getTickets = require("./gettickets");

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

	function _getTicketsInPriceRange(min, max) {
		return THIS.endDate
			.then(_getTickets.bind(THIS))
			.then(function(tickets) {
				THIS._payload.tickets = THIS._tickets.filter(function(ticket) {
					return ticket.price >= min && ticket.price <= max;
				});
				return payload;
			});
	}




}

module.exports = TicketFinder;
