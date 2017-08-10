var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path');

var config = require('./config');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

app.use(morgan('dev'));

app.get('/', function(req, res) {
	var TicketFinder = require("./lib/ticketfinder");
	var Route = require("./lib/route");

	var finder = new TicketFinder({ start: "TODAY", latestAvailable: true, weekends: true }, new Route("Pittsburgh", "Philadelphia").swap());

	finder.getTicketsInPriceRange(0,5)
		.then(function(tickets) {
			res.setHeader('content-type', 'text/plain');
			var lines = tickets.map(n => n+"").join("\n\n\n");

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

			res.send(lines);
		});

});

var http = require("http");
setInterval(function() {
    http.get("https://ride-king.herokuapp.com/");
}, 86400000); // every 5 minutes (300000)

app.listen(config.port);
console.log('Magic happening on port', config.port);
