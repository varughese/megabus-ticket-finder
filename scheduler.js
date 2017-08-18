var TicketFinder = require("./lib/ticketfinder");
var Route = require("./lib/route");

var finder = new TicketFinder({ start: "2017-11-01", latestAvailable: true, weekends: false },
	[new Route("Pittsburgh", "Philadelphia"),
	 new Route("Philadelphia", "Pittsburgh")]);


function _getTickets() {
	console.log("GETTING EMAILS, TRY", __intervalInfo.latest.i );
	finder.getTicketsInPriceRange(0,5)
		.then(function(payload) {
			var list = payload.tickets.map(function(n) {
				console.log(n.toHtml());
				return n.toHtml();
			}).join("");
			if(__intervalInfo.latest.i % 12 === 0)
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
	console.log(__intervalInfo);
	var latestIntervalInfo = __intervalInfo.latest;

	email += "<div><span>Date: " + latestIntervalInfo.t + "</span>&nbsp;<span>Email #:" + (latestIntervalInfo.i+1) + "</span></div>";
	var mailOptions = {
		from: '🚌', // sender address
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

function __task() {
	var log = {t: moment().format("h:mm:ss"), i: __intervalInfo.counter++};
	__intervalInfo.latest = log;
	__intervalInfo.log.push(log);
	__intervalInfo.counter++;
	_getTickets();
}

var moment = require("moment");
var __intervalInfo = {
	counter: 0,
	log: []
};
__task();
setInterval(__task, 3 * 60 * 60 * 1000);
