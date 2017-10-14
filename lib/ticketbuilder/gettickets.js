const setDateHelpers = require("../helpers/set-date-helpers");
const _buildJourneys = require("./buildjourneys");
const requester = require("../helpers/requester");

module.exports = function _getTickets() {
	let THIS = this;
	let promises = [];

	THIS._payload.datesList = setDateHelpers.getDatesList(THIS._dateOpts, THIS.startDate, THIS.endDate);

	let requestsTotal = THIS._payload.datesList.length * THIS.routes.length;
	console.log("FINNA MAKE", requestsTotal, "REQUESTS");

	THIS._payload.datesList.forEach(function(date) {
		THIS.routes.forEach(function(route) {
			var promise = requester.getJourneys({
				route: route,
				totalPassengers: THIS.totalPassengers,
				date: date
			})
				.then(_buildJourneys.bind(THIS, date))
				.catch(console.error.bind(null, "Error in getting ticket on "+date+"::\n"));

			promises.push(promise);
		});
	});

	return Promise.all(promises)
		.then(function(data) {
			return THIS._tickets.sort(function (t1, t2) {
				return t1.departureTime.diff(t2.departureTime);
			});
		})
		.catch(console.error);

};
