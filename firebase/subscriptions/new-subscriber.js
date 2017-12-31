let firebase = require("./firebase");
let db = firebase.database();

let subscriptionsRef = db.ref("subscriptions");

module.exports = function(data) {
	let filterId = data.filterId;
};
