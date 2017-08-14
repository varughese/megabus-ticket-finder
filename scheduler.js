var TicketFinder = require("./lib/ticketfinder");
var Route = require("./lib/route");

var finder = new TicketFinder({ start: "10/01/17", latestAvailable: true, weekends: true },
	[new Route("Pittsburgh", "Philadelphia"),
	 new Route("Philadelphia", "Pittsburgh")]);


var counter = 1;

function _getTickets() {
	console.log("GETTING EMAILS, TRY", counter++);
	finder.getTicketsInPriceRange(0,5)
		.then(function(tickets) {
			var list = tickets.map(function(n) {
				return n+"";
			}).join("<br><br>");
			_sendMail(list);
		});
}

function _sendMail(email) {
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
}

_getTickets();

setInterval(_getTickets, 12 * 60 * 60 * 1000);
