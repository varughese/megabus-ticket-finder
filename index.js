var colorsLogMethods = require("colors/safe");

const TicketFinder = require("./lib").TicketFinder;
const Route = require("./lib").Route;
const CONFIG = require("./lib").config;

var finder = new TicketFinder({
	start: "TODAY",
	latestAvailable: true,
	// end: "2017-12-20",
	// start: "2017-11-17",

	weekends: true,
	// days: [6]
}, [
	new Route("PSU", "Pittsburgh"),
	new Route("PSU", "Pittsburgh").swap(),
	new Route("Pittsburgh", "Philly"),
	new Route("Pittsburgh", "Philly").swap(),
	new Route("NY", "Pittsburgh"),
	new Route("NY", "Pittsburgh").swap()
]);

let saveTicket = require("./firebase/save-ticket");
let goOffline = require("./firebase/go-offline");

finder.findTickets()
	.then(function(tickets) {
		let promises = [];
		var originId = tickets[0] ? tickets[0].origin.cityId : 0;

		tickets.forEach(function(ticket) {
			var color = ticket.origin.cityId == originId ? "blue" : "yellow",
				coloredLogMsg = colorsLogMethods[color](ticket+"");

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
