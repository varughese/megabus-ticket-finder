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
			res.send(lines);
		});

});

app.listen(config.port);
console.log('Magic happening on port', config.port);
