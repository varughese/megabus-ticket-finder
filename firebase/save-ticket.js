var db = require("./firebase");

let ticketsRef = db.ref("tickets");

module.exports = function saveTicket(ticketInfo) {
	ticketsRef.push(ticketInfo);
};
