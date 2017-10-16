const TicketFinder = require("../lib").TicketFinder;
const Route = require("../lib").Route;
const moment = require("moment");

var assert = require("chai").assert;


describe("Ticket Finder::", function() {
	this.timeout(10000);

	let endDate = moment().add(30, 'days').format("YYYY-MM-DD"),
		startDate = moment().add(10, 'days').format("YYYY-MM-DD");

	beforeEach(function() {

	});

	it("Latest Available::", function(done) {
		let finder = new TicketFinder({
			start: "TODAY",
			latestAvailable: true,
			days: [5]
		}, [new Route("Pittsburgh", "PSU")]);

		finder.getTicketsInPriceRange(0, 30)
			.then(function(payload) {
				assert(payload.tickets.length > 0);
				if(payload.tickets.length > 0)
					done();
			})
			.catch(function(err) {
				done(err);
			});
	});

	it("Start TODAY and End date::", function(done) {
		let finder = new TicketFinder({
			start: "TODAY",
			end: endDate,
			days: [5]
		}, [new Route("Pittsburgh", "PSU")]);

		finder.findTickets()
			.then(function(tickets) {
				assert(tickets.length > 0);
				if(tickets.length > 0)
					done();
			})
			.catch(function(err) {
				done(err);
			});
	});

	it("Start date and two Routes::", function(done) {
		let finder = new TicketFinder({
			start: startDate,
			end: endDate,
			days: [5]
		}, [new Route("Pittsburgh", "PSU"), new Route("PSU", "Pittsburgh")]);

		finder.findTickets()
			.then(function(tickets) {
				assert(tickets.length > 0);
				if(tickets.length > 0)
					done();
			})
			.catch(function(err) {
				done(err);
			});
	});

});
