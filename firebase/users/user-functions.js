let firebase = require('../firebase');
let db = firebase.database();

let usersRef = db.ref('users');
let subscriptionsRef = db.ref('subscriptions');

function sanitizeEmail(email) {
	return email
		.replace(/@/g, "_at_")
		.replace(/\./g, "_dot_")
		.replace(/\$/g, "_cash_")
		.replace(/#/g, "_lb_")
		.replace(/\[/g, "_lbrack_")
		.replace(/\]/g, "_rbrack_");
}

function newUser(data) {
	let userEmail = sanitizeEmail(data.email);
	return usersRef.child(`${userEmail}`);
}

function addSubscription(data) {
	let userEmail = sanitizeEmail(data.email);
	let filterId = data.filterId;
	return usersRef.child(`${userEmail}/subscriptions`).push(filterId);
}

function _deleteUserFilter(filterId, userSubscriptionsRef) {
	return new Promise(function (resolve, reject) {
		let keyToDelete;
		userSubscriptionsRef.once("value", function (snapshot) {
			let subscriptions = snapshot.val();
			if(!subscriptions) {
				resolve();
				return;
			}
			Object.keys(subscriptions).map(key => {
				if (subscriptions[key] == filterId) {
					keyToDelete = key;
				}
			});
			if (!keyToDelete) resolve();
			userSubscriptionsRef.child(keyToDelete).remove()
				.then(resolve)
				.catch(reject);
		});
	});
}

function _deleteSubscriptionFilter(email, subscribersRef) {
	return new Promise(function(resolve, reject) {
		let keyToDelete;
		subscribersRef.once("value", function (snapshot) {
			let subscribers = snapshot.val();
			if(!subscribers) {
				resolve();
				return;
			}
			Object.keys(subscribers).map(key => {
				if (subscribers[key].email == email) {
					keyToDelete = key;
				}
			});
			if(!keyToDelete) {
				resolve();
				return;
			}
			subscribersRef.child(keyToDelete).remove()
				.then(resolve)
				.catch(reject);
		});
	});
}

function unsubscribe(data) {
	let sanitizedEmail = sanitizeEmail(data.email);
	let filterId = data.filterId;
	let subscribersRef = subscriptionsRef.child(`${filterId}/subscribers`);
	let userSubscriptionsRef = usersRef.child(`${sanitizedEmail}/subscriptions`);
	return _deleteSubscriptionFilter(data.email, subscribersRef)
		.then(_deleteUserFilter.bind(null, filterId, userSubscriptionsRef));
}

module.exports = {
	newUser: newUser,
	addSubscription: addSubscription,
	unsubscribe: unsubscribe
};