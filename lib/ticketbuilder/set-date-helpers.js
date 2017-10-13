var moment = require("moment");
var requester = require("../requester");
var config = require("../config");


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
			requester.getTravelDates(TicketFinder.routes[0])
				.then(function(data) {
					//TODO make this potentially check both routes
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
	// DUNNO IF THIS FUNCTION IS NEED
	if(_dateOpts.start) return;
	TicketFinder.startDate = TicketFinder.endDate.clone().subtract(_C.DAY_RANGE, "days");
}

function _getDatesList(_dateOpts, _C, TicketFinder) {
	var datesList = [];
	var date = TicketFinder.startDate.clone();
	var endDate = TicketFinder.endDate;
	var incrementer = 1;
	if(_dateOpts.weekends) _dateOpts.days = [5,6,0];

	let sundayOfWeek = date.startOf("week");

	//
	// if(_dateOpts.weekends) {
	// 	date.add(5 - date.day(), 'days');
	// 	endDate = TicketFinder.endDate.clone().subtract(endDate.day(), 'days');
	// }

	while(sundayOfWeek <= endDate) {
		let currentSunday = sundayOfWeek.clone();
		datesList.push(_formatDate(date));

		date.add(incrementer, 'days');
		_dateOpts.days.map((dayVal) => sundayOfWeek.clone().add(dayVal, 'days'))
		sundayOfWeek.add(1, 'week');
	}


	return datesList;
}

function _formatDate(date) {
	return moment(new Date(date)).format(config.API_DATE_FORMAT);
}


module.exports = {
	getStartDate: _getStartDate,
	getEndDate: _getEndDate,
	getDatesList: _getDatesList
};
