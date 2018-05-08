var colorsLogMethods = require("colors/safe");

const TicketFinder = require("./lib").TicketFinder;
const Route = require("./lib").Route;
const CONFIG = require("./lib").config;

var finder = new TicketFinder({
	start: "2018-03-10",
	latestAvailable: true,
	// end: "2018-01-14",
	// start: "2017-11-17",

	// weekends: true,
	days: [0, 1],
	days: [4, 5]
	// days: [0]
}, [
	new Route("Dallas", "Houston"),
	new Route("Houston", "Dallas"),
	new Route("Philly", "Pittsburgh"),
	// new Route("Pittsburgh", "Philly"),
	// new Route("PSU", "Pitt"),
]);

let saveTicket = require("./firebase/save-ticket");
let goOffline = require("./firebase/go-offline");

finder.getTicketsInPriceRange(0, 1)
	.then(function(tickets) {
		tickets = tickets.tickets;
		let promises = [];
		var originId = tickets[0] ? tickets[0].origin.cityId : 0;

		tickets.forEach(function(ticket) {
			var color = ticket.origin.cityId == originId ? "blue" : "yellow",
				coloredLogMsg = colorsLogMethods[color](ticket);

			console.log(coloredLogMsg);
			promises.push(saveTicket(ticket));
		});
		console.log('\n');
		return Promise.all(promises);
	})
	// .then(function() {
	// 	let redColoredLogMsg = colorsLogMethods.red;
	// 	console.log(redColoredLogMsg("FIREBASE"), CONFIG.BOOKMARKS.FIREBASE, '\n');
	// 	console.log(redColoredLogMsg("GITHUB"), CONFIG.BOOKMARKS.GITHUB);
	// })
	.then(function() {
		goOffline();
	});
