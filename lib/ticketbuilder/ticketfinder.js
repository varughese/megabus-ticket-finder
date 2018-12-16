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

	this.setSocket = function(socket) { this.socket = socket; };
	this._emitNewTicketOnSocket = function(ticket) {
		if(THIS.socket && currentFilter(ticket)) {
			THIS.socket.emit("new_ticket", ticket);
		}
	};

	this.findTickets = function() {
		return THIS.endDate
			.then(getTickets.bind(THIS));
	};

	var currentFilter = function() {}

	function _getTicketsInPriceRange(min, max) {
		currentFilter = function(ticket) {
			return ticket.price >= min && ticket.price <= max;
		};
		return THIS.findTickets()
			.then(function(tickets) {
				THIS._payload.tickets = THIS._tickets.filter(currentFilter);
				return THIS._payload;
			});
	}
}

module.exports = TicketFinder;
