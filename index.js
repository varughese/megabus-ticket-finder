/*jshint esversion: 6 */

var MongoClient = require("mongodb").MongoClient,
	url = 'mongodb://localhost:27017/megabustest';
// Use connect method to connect to the Server
var colorsLogMethods = require("colors/safe");


var TicketFinder = require("./lib/ticketfinder");
var Route = require("./lib/route");

var finder = new TicketFinder({
	start: "TODAY",
	latestAvailable: true,
	// start: "2017-11-17",
	end: "2017-11-17",
	// weekends: true,
	days: [4, 5, 6, 0, 1]
}, [new Route("Pittsburgh", "PSU"),
	new Route("PSU", "Pittsburgh")
]);

finder.getTicketsInPriceRange(0, 1)
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


function _saveTickets(payload) {

	MongoClient.connect(url, function(err, db) {
		console.log(":::DB CONNECT:::");

		var transaction = {
			date: new Date(),
			newDates: [],
			newTimes: [],
			newPrice: []
		};

		var db_tickets = db.collection('tickets');
		var tickets = payload.tickets;
		var _journeyIds = tickets.map(t => t.journeyId);

		db_tickets
			.find({journeyId: {$in: _journeyIds}})
			.toArray(function(err, oldDates) {
			var newJourneys = oldDates ? tickets.filter(function(t) {
					return oldDates.indexOf(t.journeyId) === -1;
				}) : tickets;
			db_tickets.insertMany(tickets.map(t => t.toJson()), function(resp) {
				console.log("NEW JAWNS");
			});
				//too fried to finish this tonight.
			});



		// ticketCollection
		// 	.insertMany(tickets.map(t => t.toJson()), function(err, r) {
		// 		db.close();
		// 	});
	});
}

function MongoVersionTranscation(data, fields) {

}

// TODO: add option to search by days

/*
x = x.map(function(ticket) {
return {price: ticket.price, origin: ticket.origin.cityCode, destination: ticket.destination.cityCode, date: ticket.date, departureTime: ticket.departureTime, arrivalTime: ticket.arrivalTime};
}).map(function(ticket) {
return {
title: "$" +ticket.price + " [" + ticket.origin + "-->" + ticket.destination +"]",
start: new Date(ticket.departureTime),
end: new Date(ticket.arrivalTime)
}
})

var megabus = require("megabus");


var finder = new megabus.TicketFinder('11/1/2017', '11/15/2017', [
	// New York <-> Philadelphia
	new megabus.Route('Philadelphia', 'Pittsburgh'),
	new megabus.Route('Pittsburgh', 'Philadelphia'),
]);



var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'megabus.ticket.finder@gmail.com',
		pass: 'megabusticket'
	}
});

// setup email data with unicode symbols
var mailOptions = {
	from: '"MEGA BUS FINDER" <megabustickerfinder@gmail.com>', // sender address
	to: 'matvarughese3@gmail.com', // list of receivers
	subject: 'Cheapest Ticket NY to PHL', // Subject line
	html: '' // html body
};

finder.getTicketsInPriceRange(0, 5)
	.then(function(tickets) {
		tickets.forEach((ticket, idx) => {
			mailOptions.html += `<b>${idx + 1}</b> ${ticket}<br><br>`;
		});
		console.log(`*** ${tickets.length} tickets found ***`);

		// send mail with defined transport object


	});
*/
