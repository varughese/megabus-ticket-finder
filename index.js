/*jshint esversion: 6 */

var MongoClient = require("mongodb").MongoClient,
	url = 'mongodb://localhost:27017/megabustest';
// Use connect method to connect to the Server
var colorsLogMethods = require("colors/safe");


const TicketFinder = require("./lib").TicketFinder;
const Route = require("./lib").Route;

var finder = new TicketFinder({
	start: "TODAY",
	latestAvailable: true,
	// end: "2017-12-20",
	// start: "2017-11-17",

	// weekends: true,
	days: [4, 5, 6, 0, 1]
}, [new Route("Pittsburgh", "PHILADELPHIA"),
	new Route("Philadelphia", "Pittsburgh")
]);

finder.getTicketsInPriceRange(0, 10)
	.then(function(payload) {
		var originId = payload.tickets[0].origin.cityId;
		payload.tickets.forEach(function(ticket) {
			var color = ticket.origin.cityId == originId ? "blue" : "yellow",
				coloredLogMsg = colorsLogMethods[color](ticket+"");

			console.log(coloredLogMsg);
		});
		console.log('\n');
		// _saveTickets(payload);
	});
