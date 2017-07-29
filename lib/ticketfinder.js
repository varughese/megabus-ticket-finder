var config = require("./config");
var moment = require("moment");

function TicketFinder(startDate, endDate, routes) {
	var THIS = this;

	this.startDate = _formatDate(startDate);
	this.endDate = _formatDate(endDate);
	this.routes = route;

	this.getTicketsInPriceRange = _getTicketsInPriceRange(min, max);

	function _getTicketsInPriceRange(min, max) {
		_getJourney(date)
			.then(function() {

			});
	}

	function _getJourney() {

	}
}

function _formatDate(date) {
	return moment(new Date(date)).format(config.API_DATE_FORMAT);
}
