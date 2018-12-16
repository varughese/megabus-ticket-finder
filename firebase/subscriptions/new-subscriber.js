let firebase = require('../firebase');
let validateFilterId = require('../../lib/helpers/get-filterid');
let addSubscriptionToUser = require('../users/user-functions').addSubscription;
let db = firebase.database();

let subscriptionsRef = db.ref('subscriptions');

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
	}).then(addSubscriptionToUser.bind(null, {
		email: data.email,
		filterId: filterId
	}));
};
