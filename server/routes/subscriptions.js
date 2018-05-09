const addSubscription = require("../../firebase/subscriptions/new-subscriber");

module.exports = function(apiRouter) {
	apiRouter.post('/subscriber', function(req, res) {
		addSubscription(req.body).then(function() {
			res.sendStatus(200);
		}).catch(function(err) {
			console.error(err);
			res.sendStatus(400);
		});
	});
};
