let firebase = require("../firebase");
let db = firebase.database();

let subscriptionsRef = db.ref("subscriptions");


function pushTicket(ticketInfo) {
	let filterId = ticketInfo.getFilterId();
	let ticketId = ticketInfo.journeyId;
	let ticketsRef = subscriptionsRef.child(`${filterId}/tickets`);

	return ticketsRef.push(ticketId);
}

function alertUsers(ticketInfo) {
	return new Promise(function(resolve, reject) {
		let filterId = ticketInfo.getFilterId();
		let subscribersRef = subscriptionsRef.child(`${filterId}/subscribers`);

		subscribersRef.once("value", function(snapshot) {
			let subscribers = snapshot.val();
			console.log("subscibres", subscribers);
			if(subscribers) {
				resolve(subscribers);
			}
		});

	});
}

module.exports = {
	pushTicket: pushTicket,
	alertUsers: alertUsers
};
