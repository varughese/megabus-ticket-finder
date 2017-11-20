const Route = require("../lib").Route;
const moment = require("moment");

var assert = require("chai").assert;


describe("Routes::", function() {
	let endDate = moment().add(30, 'days').format("YYYY-MM-DD"),
		startDate = moment().add(10, 'days').format("YYYY-MM-DD");

	beforeEach(function() {

	});

	it("Can understand city names::", function() {
		let route = new Route("Pittsburgh", "PSU");
		assert(route.originId, 128);
		assert(route.destinationId, 137);
	});

	it("Can understand city ID numbers::", function() {
		let route = new Route("128", "137");
		console.log(route);
		assert(route.originId, 128);
		assert(route.destinationId, 137);
	});
});
