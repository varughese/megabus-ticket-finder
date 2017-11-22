var colorsLogMethods = require("colors/safe");

const TicketFinder = require("./lib").TicketFinder;
const Route = require("./lib").Route;

var finder = new TicketFinder({
	start: "TODAY",
	latestAvailable: true,
	// end: "2017-12-20",
	// start: "2017-11-17",

	weekends: true,
	// days: [6]
}, [new Route("Philadelphia", "Pittsburgh")
]);

let saveTicket = require("./firebase/save-ticket");
let goOffline = require("./firebase/go-offline");

finder.getTicketsInPriceRange(0, 10)
	.then(function(payload) {
		var originId = payload.tickets[0] ? payload.ticket[0].origin.cityId : 0;
		payload.tickets.forEach(function(ticket) {
			var color = ticket.origin.cityId == originId ? "blue" : "yellow",
				coloredLogMsg = colorsLogMethods[color](ticket+"");

			console.log(coloredLogMsg);
			saveTicket(ticket.toJson());
		});
		console.log('\n');
	})
	.then(function() {
		goOffline();
	});
