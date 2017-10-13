var config = require("./config");
var moment = require("moment");
var Ticket = require("./ticket");
var request = require("request-promise");
var requester = require("./requester");
var Journey = require("./journey");

var setDateHelpers = require("./ticketbuilder/set-date-helpers"); // TODO rename this to date-helpers

function TicketFinder(dateOpts, routes) {
	var THIS = this;
	var _tickets = [];
	var _dateOpts = dateOpts;
	var _skippedDates = [];
	var payload = {};

	this.routes = routes;
	this.startDate = setDateHelpers.getStartDate(_dateOpts, THIS);
	this.endDate = setDateHelpers.getEndDate(_dateOpts, THIS);
	this.totalPassengers = dateOpts.totalPassengers || 1;


	this.getTicketsInPriceRange = _getTicketsInPriceRange;

	// TODO break request service into own module and the get Ticket crap into own module
	function _getTicketsInPriceRange(min, max) {
		return THIS.endDate
			.then(_getTickets)
			.then(function(tickets) {
				payload.tickets = _tickets.filter(function(ticket) {
					return ticket.price >= min && ticket.price <= max;
				});
				return payload;
			})
			.catch(function(err) {
				console.error("Therer was an issue getting the tickets", err);
			});
	}

	function _getTickets() {
		var promises = [];
		var tickets = [];
		payload.datesList = setDateHelpers.getDatesList(_dateOpts, THIS.startDate, THIS.endDate);
		console.log("FINNA MAKE", payload.datesList.length * THIS.routes.length, "REQUESTS");
		payload.datesList.forEach(function(date) {
			THIS.routes.forEach(function(route) {
				var promise = requester.getJourneys(route, date, THIS.totalPassengers)
				.then(_buildJourneys.bind(THIS, date))
				.catch(console.error);

				promises.push(promise);
			});
		});

		return Promise.all(promises)
			.then(function(data) {
				return _tickets.sort(function (t1, t2) {
				    return t1.departureTime.diff(t2.departureTime);
				});
			})
			.catch(function(err) {
				console.error(err);
			});


		// gets the data
		// _buildTickets();
	}

	function _buildJourneys(date, data) {
		if(data.err) {
			_skippedDates.push(date);
			return;
		}
		if (!data.journeys) {
			throw "Cannot find journey, check if Megabus API has changed";
			// TODO save a json file of what it looks like now and check if structure is similar or not
		}

		data.journeys.forEach(function(journeyData) {
			var ticket = new Journey(journeyData, date).getTicket();
			_tickets.push(ticket);
		});

		return date;
	}
}

module.exports = TicketFinder;
