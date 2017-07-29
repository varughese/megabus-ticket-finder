var config = require("./config");
var moment = require("moment");
var request = require("request-promise");

function TicketFinder(startDate, endDate, route) {
	var THIS = this;

	this.startDate = moment(new Date(startDate));
	this.endDate = moment(new Date(endDate));
	this.route = route;

	this.getTicketsInPriceRange = _getTicketsInPriceRange;

	function _getTicketsInPriceRange(min, max) {
		_getTickets();
		// filters tickets
	}

	function _getTickets() {
		var promises = [];
		for(var date = THIS.startDate; date <= THIS.endDate; date.add(1, 'days')) {
			promises.push(request({
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
			}));
		}
		Promise.all(promises)
			.then(function(data) {
				console.log(data);
			})
			.catch(function(err) {
				console.error(err);
			});


		// gets the data
		// _buildTickets();
	}

	function _buildTickets(data, date, route) {
		// makes new Journeys
		// makes new tickets from journeys
	}
}

function _formatDate(date) {
	return moment(new Date(date)).format(config.API_DATE_FORMAT);
}

module.exports = TicketFinder;
