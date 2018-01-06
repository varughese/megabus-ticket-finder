module.exports = function(app, express) {
	let apiRouter = express.Router();

	require("./tickets")(apiRouter);
	require("./subscriptions")(apiRouter);

    return apiRouter;
};
