let firebase = require("../firebase");
let validateFilterId = require("../../lib/helpers/get-filterId");
let db = firebase.database();

let subscriptionsRef = db.ref("subscriptions");

/*
{
	filterId: MMDDYY_ORG_DST
	email: __@__.com
	price: ##
}
*/

module.exports = function(data) {
	let filterId = validateFilterId(data.filterId);
	return subscriptionsRef.child(`${filterId}/subscribers`).push({
		email: data.email,
		price: data.price
	});
};
