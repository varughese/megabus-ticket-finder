var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path');

var config = require('./lib/config');
const TicketFinder = require("./lib").TicketFinder;
const Route = require("./lib").Route;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

app.use(morgan('dev'));

function _makeArrayFromString(string) {
	return string ? string.slice(1, -1).split(",") : undefined;
}

function _normalizeDate(date) {
	return date ? new Date(date) : undefined;
}

app.get('/api/tickets', function(req, res) {
	console.log(req.query);

	let originId = Number(req.query.originId);
	let destinationId = Number(req.query.destinationId);
	let start = _normalizeDate(req.query.start);
	let end = _normalizeDate(req.query.end);
	let days = _makeArrayFromString(req.query.days);

	var finder = new TicketFinder({
		start: start,
		latestAvailable: true,
		end: end,
		days: days
	}, [new Route(originId, destinationId), new Route(destinationId, originId)
	]);

	res.setHeader('content-type', 'text/html');
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

app.get('/example', function(req, res) {


	var finder = new TicketFinder({
		start: "TODAY",
		latestAvailable: true,
		// end: "2017-12-20",
		// start: "2017-11-17",

		weekends: true,
		// days: [6]
	}, [new Route("Pittsburgh", "PSU"), new Route("Pittsburgh", "Philadelphia")]);

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

app.use(express.static(__dirname + '/public'));

console.log('Magic happening on port', config.PORT);
