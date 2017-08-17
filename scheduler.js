var TicketFinder = require("./lib/ticketfinder");
var Route = require("./lib/route");

var finder = new TicketFinder({ start: "10/01/17", latestAvailable: true, weekends: true },
	[new Route("Pittsburgh", "Philadelphia"),
	 new Route("Philadelphia", "Pittsburgh")]);


function _getTickets() {
	console.log("GETTING EMAILS, TRY", counter++);
	finder.getTicketsInPriceRange(0,5)
		.then(function(tickets) {
			var list = tickets.map(function(n) {
				return n.toHtml();
			}).join("<br><br>");
			if(counter % 12 === 0)
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
	var latestIntervalInfo = _intervalInfo[_intervalInfo.length-1];

	email += "<br><br><p>Date: " + latestIntervalInfo.t + " Counter:" + latestIntervalInfo.i + "</p>";
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

var counter = 0;
var _intervalInfo = [];
setInterval(function() {
	_intervalInfo.push({t: new Date(), i: counter++});
	_getTickets();
}, 3 * 60 * 60 * 1000);
