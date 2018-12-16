module.exports = function(app, express, io) {
	let apiRouter = express.Router();

	require('./tickets')(apiRouter, io);
	require('./subscriptions')(apiRouter);
	require('./users')(apiRouter);


	return apiRouter;
};
