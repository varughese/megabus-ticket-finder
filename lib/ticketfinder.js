var config = require("./config");
var moment = require("moment");
var Ticket = require("./ticket");
var request = require("request-promise");
var requester = require("./requester");
var Journey = require("./journey");

function TicketFinder(dateOpts, route) {
	var THIS = this;
	var _tickets = [];
	var _C = {
		DAY_RANGE: 15
	};
	var _loadingInfo = {
		totalDays: 0,
		downloadedDays: 1,
		totalTickets: 0,
		logInterval: 2
	};
	var _dateOpts = dateOpts; // TODO clean function
	/*
	 * StartDate should just be start
	 *
	 */

	this.route = route;

	this.startDate = moment(new Date(dateOpts.start));
	if(_dateOpts.start && _dateOpts.start.toLowerCase().indexOf("today") > -1) this.startDate = moment();

	this.endDate = new Promise(function(resolve, reject) {
		if(_dateOpts.latestAvailable) {
			requester.getTravelDates(THIS.route)
				.then(function(data) {
					if(!data.availableDates.length) throw "API might have changed. Check /journeys/travel-dates";
					THIS.endDate = moment(new Date(data.availableDates.pop()));
				})
				.catch(function(err) {
					console.error("Could not find all the available dates, defaulting to today's date plus a month", err);
					THIS.startDate = moment();
					THIS.endDate = THIS.startDate.clone().add(_C.DAY_RANGE, "days");
				})
				.finally(function() {
					_setStartDate();
					resolve(THIS.endDate);
				});
		} else {
			THIS.endDate = moment(_dateOpts.end);
			_setStartDate();
			resolve(THIS.endDate);
		}
	});

	function _setStartDate() {
		if(_dateOpts.start) return;
		THIS.startDate = THIS.endDate.clone().subtract(_C.DAY_RANGE, "days");
	}



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
		_loadingInfo.totalDays = THIS.endDate.diff(THIS.startDate, 'days');
		// if(_dateOpts.weekends)

		for (var date = THIS.startDate.clone(); date <= THIS.endDate; date.add(1, 'days')) {
			var promise = requester.getJourneys(THIS.route, date)
				.then(_buildJourneys)
				.catch(console.error);

			promises.push(promise);
		}

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
