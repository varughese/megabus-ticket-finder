const emailer = require("../../lib/emailer/emailer");

let firebase = require("../firebase");
let db = firebase.database();

let subscriptionsRef = db.ref("subscriptions");


function pushTicket(ticketInfo) {
	let filterId = ticketInfo.getFilterId();
	let ticketId = ticketInfo.journeyId;
	let ticketsRef = subscriptionsRef.child(`${filterId}/tickets`);

	return ticketsRef.push(ticketId);
}

function transformToArray(obj) {
	return Object.keys(obj).map(key => obj[key]);
}

function _alert(resolve, reject, subscribers, ticketInfo) {
	// { '-L1i35ERw0dLG7YIWpS0': { email: 'test@test.com', price: '300' } }
	let price = ticketInfo.price;
	let emailsToAlert = transformToArray(subscribers)
		.filter(s => (price <= s.price))
		.map(s => s.email);

	if(emailsToAlert) {
		console.log("Emailing,", emailsToAlert);
		emailer(emailsToAlert, "single", ticketInfo);
	}

	resolve(emailsToAlert);
}

function alertUsers(ticketInfo) {
	return new Promise(function(resolve, reject) {
		let filterId = ticketInfo.getFilterId();
		let subscribersRef = subscriptionsRef.child(`${filterId}/subscribers`);
		subscribersRef.once("value", function(snapshot) {
			let subscribers = snapshot.val();
			if(subscribers) {
				_alert(resolve, reject, subscribers, ticketInfo);
			} else {
				resolve(true);
			}
		});

	});
}

module.exports = {
	pushTicket: pushTicket,
	alertUsers: alertUsers
};
