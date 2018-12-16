const Journey = require("../classes/journey");

module.exports = function _buildJourneys(date, data) {
	let THIS = this;

	if(data.err) {
		THIS._skippedDates.push(date);
		return;
	}

	if (!data.journeys) {
		throw "Cannot find journey, check if Megabus API has changed";
		// TODO save a json file of what it looks like now and check if structure is similar or not
	}

	data.journeys.forEach(function(journeyData) {
		let ticket = new Journey(journeyData, date).getTicket();
		THIS._emitNewTicketOnSocket(ticket);
		THIS._tickets.push(ticket);
	});

	return date;
};
