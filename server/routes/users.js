const userFns = require('../../firebase/users/user-functions');

module.exports = function (apiRouter) {
	/*
	 * { email: mav120@pitt.edu }
	 */
	apiRouter.post('/user', function (req, res) {
		userFns.newUser(req.body).then(function () {
			res.send(200);
		}).catch(function (err) {
			console.error(err);
			res.send(400);
		});
	});
};
