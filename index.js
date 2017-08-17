/*jshint esversion: 6 */

var mongo = require("mongodb").MongoClient,
	url = 'mongodb://localhost:27017/megabustest';
// Use connect method to connect to the Server


var TicketFinder = require("./lib/ticketfinder");
var Route = require("./lib/route");

var finder = new TicketFinder({
	start: "TODAY",
	latestAvailable: true,
	weekends: false
}, [new Route("Pittsburgh", "Philadelphia"),
	new Route("Philadelphia", "Pittsburgh")
]);

finder.getTicketsInPriceRange(0, 5)
	.then(function(tickets) {
		tickets.forEach(function(ticket) {
			console.log(ticket + "");
			_saveTicket(ticket);
		});
	});


function _saveTicket(ticket) {
	MongoClient.connect(url, function(err, db) {
		console.log(":::DB CONNECT:::");

		// Insert a single document
		db.collection('tickets').insertOne({
			a: 1
		}, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
		});

		db.collection('inserts').insertMany([{
			a: 2
		}, {
			a: 3
		}], function(err, r) {
			assert.equal(null, err);
			assert.equal(2, r.insertedCount);

			db.close();
		});
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
