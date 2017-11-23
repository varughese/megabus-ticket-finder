var db = require("./firebase").database();

let ticketsRef = db.ref("tickets");
let ticketHistory = db.ref("ticket_history");


function createTicket(journeyRef, ticketInfo) {
	return journeyRef.set(ticketInfo.toJson());
}

function updateTicket(snapshot, journeyRef, ticketInfo) {
	// console.log("OLD INFO", snapshot.val());
	return journeyRef.update(ticketInfo.toJson());
}

module.exports = function(ticketInfo) {
	let journeyRef = db.ref(`tickets/${ticketInfo.journeyId}`);

	return journeyRef.once("value", function(snapshot) {
		if(snapshot.val())
			return updateTicket(snapshot, journeyRef, ticketInfo);
		else
			return createTicket(journeyRef, ticketInfo);
	});
};
