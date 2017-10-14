var TicketFinder = require("../lib/ticketfinder");
var Route = require("../lib/route");
var assert = require("chai").assert;


describe("Ticket Finder::", function() {
	this.timeout(10000);
	let finder;
	beforeEach(function() {
		finder = new TicketFinder({
			start: "TODAY",
			latestAvailable: true,
			days: [5]
		}, [new Route("Pittsburgh", "PSU")]);



	});

	it("Gets back data::", function(done) {
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
});
