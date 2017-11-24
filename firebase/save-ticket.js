let firebase = require("./firebase");
let db = firebase.database();
let TicketHistoryTransaction = require("../lib/classes/tickethistory");

let ticketsRef = db.ref("tickets");
let ticketHistoryRef = db.ref("ticket_history");

function upsertTransaction(ticketInfo) {
	let timestamp = firebase.database.ServerValue.TIMESTAMP;
	let trans = new TicketHistoryTransaction(ticketInfo, timestamp);
	return ticketHistoryRef.child(ticketInfo.journeyId).push(trans);
}

function createTicket(ticketRef, ticketInfo) {
	return ticketRef.set(ticketInfo.toJson())
		.then(function() {
			return upsertTransaction(ticketInfo);
		});

}

function updateTicket(outdatedTicket, ticketRef, ticketInfo) {
	let oldPrice = outdatedTicket.price;
	return ticketRef.update(ticketInfo.toJson())
		.then(function() {
			if(ticketInfo.price !== oldPrice) {
				return upsertTransaction(ticketInfo);
			}
			return ticketInfo;
		});
}

module.exports = function(ticketInfo) {
	return new Promise(function(resolve, reject) {
		let ticketRef = db.ref(`tickets/${ticketInfo.journeyId}`);

		ticketRef.once("value", function(snapshot) {
			let val = snapshot.val(), promise;
			if(val)
				promise = updateTicket(val, ticketRef, ticketInfo);
			else
				promise = createTicket(ticketRef, ticketInfo);

			promise.then(resolve).catch(reject);
		});
	});

};
