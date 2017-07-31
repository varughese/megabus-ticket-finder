var config = require("./config");
var moment = require("moment");
var Ticket = require("./ticket");
var request = require("request-promise");
var Journey = require("./journey");

function TicketFinder(dateOpts, route) {
	var THIS = this;
	var _tickets = [];

	if(dateOpts.latestAvailable) {
		// make request to :
		// url: "https://us.megabus.com/journey-planner/api/journeys/travel-dates",
		// qs: {
		// 	originCityId: CITY.PITT,
		// 	destinationCityId: CITY.PHL
		// }
	}

	this.startDate = moment(new Date(dateOpts.start));
	this.endDate = moment(new Date(dateOpts.end));
	this.route = route;

	this.getTicketsInPriceRange = _getTicketsInPriceRange;


	function _getTicketsInPriceRange(min, max) {
		return _getTickets()
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
				    return t1.date.getMilliseconds() - t2.date.getMilliseconds();
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
