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
	var _C = {
		DAY_RANGE: 15
	}; //TODO get rid of this shit
	var _dateOpts = dateOpts;
	var _skippedDates = [];

	this.routes = routes;
	this.startDate = setDateHelpers.getStartDate(_dateOpts, _C, THIS);
	this.endDate = setDateHelpers.getEndDate(_dateOpts, _C, THIS);

	this.getTicketsInPriceRange = _getTicketsInPriceRange;

	// TODO break request service into own module and the get Ticket crap into own module
	function _getTicketsInPriceRange(min, max) {
		return THIS.endDate
			.then(_getTickets)
			.then(function(tickets) {
				return _tickets.filter(function(ticket) {
					return ticket.price >= min && ticket.price <= max;
				});
			})
			.catch(function(err) {
				console.error("Therer was an issue getting the tickets", err);
			});
	}

	function _getTickets() {
		var promises = [];
		var tickets = [];
		var datesList = setDateHelpers.getDatesList(_dateOpts, _C, THIS);
		console.log("FINNA MAKE", datesList.length * THIS.routes.length, "REQUESTS");
		datesList.forEach(function(date) {
			THIS.routes.forEach(function(route) {
				var promise = requester.getJourneys(route, date)
				.then(_buildJourneys)
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

	function _buildJourneys(data) {
		if(data.err) {
			_skippedDates.push(data.date);
			return;
		}
		if (!data.dates[0].journeys) throw "Cannot find journey, check if Megabus API has changed";

		var date = data.dates[0].date,
			available = data.dates[0].available;

		data.dates[0].journeys.forEach(function(journeyData) {
			var ticket = new Journey(journeyData, date).getTicket();
			_tickets.push(ticket);
		});

		return date;
	}
}



module.exports = TicketFinder;
