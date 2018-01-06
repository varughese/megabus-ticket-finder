const moment = require("moment");

const TicketFinder = require("../../lib").TicketFinder;
const Route = require("../../lib").Route;


let endDate = moment().add(20, 'days').format("YYYY-MM-DD"),
	startDate = moment().add(10, 'days').format("YYYY-MM-DD");

let finder = new TicketFinder({ start: startDate, end: endDate },
	[new Route("Pittsburgh", "Philadelphia")]);


function getTickets() {
	console.log("GETTING TICKETS");
	return finder.findTickets()
		.then(function(payload) {
			console.log("\n\nGOT TICKETS");
			return payload[0];
		});
}

const emailer = require("../../lib/emailer/emailer");


getTickets()
	.then(function(ticket) {
		console.log("EMAILING");
		emailer(["varhawk5@gmail.com", "matvarughese3@gmail.com"], "single", ticket);
	});
