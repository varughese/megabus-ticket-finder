var config = require("./config");
var moment = require("moment");
var Ticket = require("./ticket");
var request = require("request-promise");
var Journey = require("./journey");

function TicketFinder(dateOpts, route) {
	var THIS = this;
	var _tickets = [];
	var _C = {
		DAY_RANGE: 15
	};

	this.route = route;

	this.startDate = moment(new Date(dateOpts.start));
	this.endDate = new Promise(function(resolve, reject) {
		if(dateOpts.latestAvailable) {
			request(config.API_URL + "journeys/travel-dates", {
				qs: {
					originCityId: THIS.route.originId,
					destinationCityId: THIS.route.destinationId
				}
			})
				.then(JSON.parse)
				.then(function(data) {
					if(!data.availableDates.length) throw "API might have changed. Check /journeys/travel-dates";
					THIS.endDate = moment(new Date(data.availableDates.pop()));
				})
				.catch(function(err) {
					console.error("Could not find all the available dates, defaulting to today's date plus a month", err);
					THIS.startDate = moment();
					THIS.endDate = THIS.startDate.add(_C.DAY_RANGE, "days");
				})
				.finally(function() {
					_setStartDate();
					resolve(THIS.endDate);
				});
		} else {
			THIS.endDate = moment(dateOpts.end);
			_setStartDate();
			resolve(THIS.endDate);
		}
	});

	function _setStartDate() {
		if(dateOpts.startDate) return;
		THIS.startDate = THIS.endDate.subtract(_C.DAY_RANGE, "days");
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

		for (var date = THIS.startDate; date <= THIS.endDate; date.add(1, 'days')) {
			var promise = request({
					url: config.API_URL + "journeys",
					qs: {
						originId: THIS.route.originId,
						destinationId: THIS.route.destinationId,
						departureDate: _formatDate(date),
						totalPassengers: 1,
						concessionCount: 0,
						nusCount: 0,
						days: 1
					}
				})
				.then(JSON.parse)
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

function _formatDate(date) {
	return moment(new Date(date)).format(config.API_DATE_FORMAT);
}

module.exports = TicketFinder;
