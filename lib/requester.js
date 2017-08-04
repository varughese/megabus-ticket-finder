var request = require("request-promise");
var config = require("./config");
var moment = require("moment");

module.exports = {
	getTravelDates: function(route) {
		return request(config.API_URL + "journeys/travel-dates", {
			qs: {
				originCityId: route.originId,
				destinationCityId: route.destinationId
			}
		})
			.then(JSON.parse);
	},
	getJourneys: function(route, date) {
		return request({
				url: config.API_URL + "journeys",
				qs: {
					originId: route.originId,
					destinationId: route.destinationId,
					departureDate: _formatDate(date),
					totalPassengers: 1,
					concessionCount: 0,
					nusCount: 0,
					days: 1
				}
			})
			.then(JSON.parse);
	}
};

function _formatDate(date) {
	return moment(new Date(date)).format(config.API_DATE_FORMAT);
}
