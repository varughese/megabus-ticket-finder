const TicketFinder = require("../lib").TicketFinder;
const Route = require("../lib").Route;
const moment = require("moment");

var assert = require("chai").assert;


describe("Ticket Finder::", function() {
	this.timeout(10000);

	beforeEach(function() {

	});

	it("Gets back data::", function(done) {
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

	it("Works with a end date::", function(done) {
		let finder = new TicketFinder({
			start: "TODAY",
			end: moment().add(40, 'days').format("YYYY-MM-DD"),
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
});
