/*jshint esversion: 6 */

var TicketFinder = require("./lib/ticketfinder");
var Route = require("./lib/route");

var finder = new TicketFinder({ start: "9/15/2017", end: "10/1/2017" }, new Route("Pittsburgh", "Philadelphia").swap());

finder.getTicketsInPriceRange(0,10)
	.then(function(tickets) {
		tickets.map(n => console.log(n+""));
	});

// TODO: add option to search by days

/*
var megabus = require("megabus");
var nodemailer = require("nodemailer");

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
		// transporter.sendMail(mailOptions, function(error, info) {
		// 	if (error) {
		// 		return console.log(error);
		// 	}
		// 	console.log('Message %s sent: %s', info.messageId, info.response);
		// });

	});
*/
