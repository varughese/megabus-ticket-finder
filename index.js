/*jshint esversion: 6 */

var TicketFinder = require("./lib/ticketfinder");
var Route = require("./lib/route");

var finder = new TicketFinder({ start: "TODAY", latestAvailable: true, weekends: true }, new Route("Pittsburgh", "Philadelphia"));

finder.getTicketsInPriceRange(0,5)
	.then(function(tickets) {
		var email = tickets.map(n => n+"").join("<br><br>");
		var nodemailer = require("nodemailer");
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'megabus.ticket.finder@gmail.com',
				pass: 'megabusticket'
			}
		});

		var mailOptions = {
			from: '"MEGA BUS FINDER" <megabustickerfinder@gmail.com>', // sender address
			to: 'matvarughese3@gmail.com', // list of receivers
			subject: 'Cheapest Ticket PHL to PITT', // Subject line
			html: email // html body
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
		});
	});

// TODO: add option to search by days

/*
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
