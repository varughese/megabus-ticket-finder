const TicketFinder = require("../../lib").TicketFinder;
const Route = require("../../lib").Route;
const moment = require("moment");

function makeArrayFromString(string) {
	return string ? string.slice(1, -1).split(",") : undefined;
}

function normalizeDate(date) {
	return date ? new Date(date) : undefined;
}


module.exports = function(apiRouter, io) {
	apiRouter.get('/tickets', function(req, res) {
		try {
			let finderOptions = {
				originId: Number(req.query.originId),
				destinationId: Number(req.query.destinationId),
				latestAvailable: !req.query.end,
				start: normalizeDate(req.query.start),
				end: normalizeDate(req.query.end),
				days: req.query.days && req.query.days.split("").map(Number)
			};

	
			let routes = [new Route(finderOptions.originId, finderOptions.destinationId)];
			if(req.query.bothWays == 'true') routes.push(new Route(finderOptions.destinationId, finderOptions.originId));

			let finder = new TicketFinder(finderOptions, routes);

			if(req.query.socket_id) {
				let socket = io.to(req.query.socket_id);
				finder.setSocket(socket);
			}

			let minPrice = Number(req.query.minPrice) || 0;
			let maxPrice = Number(req.query.maxPrice) || 200;

			finder.getTicketsInPriceRange(minPrice, maxPrice)
				.then(function(payload) {
					res.send(payload);
				});
		} catch(e) {
			console.error(e);
			res.send(e);
		}
	});
};
