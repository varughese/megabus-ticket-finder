const addSubscription = require("../../firebase/subscriptions/new-subscriber");
const moment = require("moment");

module.exports = function(apiRouter) {
	apiRouter.post('/subscriber', function(req, res) {
		/*
		{
			filterId: MMDDYY_ORG_DST
			email: __@__.com
			price: ##
		}
		*/
		if(!req.body.start) return;
		if(!req.body.originId) return;
		if(!req.body.destinationId) return;
		if(!req.body.email) return;
		if(!req.body.maxPrice) return;
		var d = new Date(req.body.start);
		var filterId = moment(d).format("MMDDYY") + "_" + req.body.originId + "_" + req.body.destinationId;
		var sub = {
			filterId: filterId,
			email: req.body.email,
			price: req.body.maxPrice
		};
		console.log(sub);
		addSubscription(sub).then(function() {
			res.sendStatus(200);
		}).catch(function(err) {
			console.error(err);
			res.sendStatus(400);
		});
	});
};
