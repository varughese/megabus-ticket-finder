var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path');

var config = require('./lib/config');


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
	const TicketFinder = require("./lib").TicketFinder;
	const Route = require("./lib").Route;

	var finder = new TicketFinder({
		start: "TODAY",
		latestAvailable: true,
		// end: "2017-12-20",
		// start: "2017-11-17",

		weekends: true,
		// days: [6]
	}, [new Route("Pittsburgh", "PSU"), new Route("PSU", "Pittsburgh"),
	new Route("Philadelphia", "Pittsburgh").swap()
	]);

	finder.getTicketsInPriceRange(0,5)
		.then(function(payload) {
			res.setHeader('content-type', 'text/html');
			var lines = "";
			payload.tickets.forEach(function(ticket) {
				lines+= ticket.toHtml();
			});


			res.send(lines);
		});

});

app.listen(config.PORT);
console.log('Magic happening on port', config.PORT);
