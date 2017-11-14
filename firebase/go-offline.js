var firebase = require("./firebase");

module.exports = function() {
	return firebase.app().delete();
};
