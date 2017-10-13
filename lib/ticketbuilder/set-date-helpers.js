var moment = require("moment");
var requester = require("../requester");
var config = require("../config");


function _getStartDate(_dateOpts, TicketFinder) {
	var startDate = _dateOpts.start;
	if(!startDate || startDate.toLowerCase().indexOf("today") > -1)
		return moment();
	else
		return moment(startDate);
}

function _getEndDate(_dateOpts, TicketFinder) {
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

function _setStartDate(_dateOpts, TicketFinder) {
	// DUNNO IF THIS FUNCTION IS NEED
	if(_dateOpts.start) return;
	TicketFinder.startDate = TicketFinder.endDate.clone().subtract(_C.DAY_RANGE, "days");
}

function _getDatesList(_dateOpts, _startDate, endDate) {
	var datesList = [];

	if(_dateOpts.weekends) _dateOpts.days = [0,5,6];

	_dateOpts.days = _dateOpts.days || [0,1,2,3,4,5,6];

	let sundayOfWeek = _startDate.clone().startOf("week");

	while(sundayOfWeek <= endDate) {
		for(let d=0; d<_dateOpts.days.length; d++) {
			let day = sundayOfWeek.clone().add(_dateOpts.days[d], 'days');
			datesList.push(_formatDate(day));
		}

		sundayOfWeek.add(1, 'week');
	}

	while(moment(datesList[0]) < _startDate)
		datesList.shift();

	while(moment(datesList[datesList.length-1]) > endDate)
		datesList.pop();

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
