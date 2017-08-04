var moment = require("moment");
var requester = require("../requester");


function _getStartDate(_dateOpts, _C, TicketFinder) {
	var startDate = _dateOpts.start;
	if(!startDate || startDate.toLowerCase().indexOf("today") > -1)
		return moment();
	else
		return moment(startDate);
}

function _getEndDate(_dateOpts, _C, TicketFinder) {
	return new Promise(function(resolve, reject) {
		if(_dateOpts.latestAvailable) {
			requester.getTravelDates(TicketFinder.route)
				.then(function(data) {
					if(!data.availableDates.length) throw "API might have changed. Check /journeys/travel-dates";
					TicketFinder.endDate = moment(data.availableDates.pop());
				})
				.catch(function(err) {
					console.error("Could not find all the available dates, adding 15 days to start date", err);
					TicketFinder.endDate = TicketFinder.startDate.clone().add(_C.DAY_RANGE, "days");
				})
				.finally(function() {
					TicketFinder.startDate.startOf("day");
					TicketFinder.endDate.endOf("day");
					resolve(TicketFinder.endDate);
				});
		} else {
			TicketFinder.endDate = moment(_dateOpts.end);
			resolve(TicketFinder.endDate);
		}
	});
}

function _setStartDate(_dateOpts, _C, TicketFinder) {
	// DUNNO IF THIS IS NEED
	if(_dateOpts.start) return;
	TicketFinder.startDate = TicketFinder.endDate.clone().subtract(_C.DAY_RANGE, "days");
}

module.exports = {
	getStartDate: _getStartDate,
	getEndDate: _getEndDate
};
