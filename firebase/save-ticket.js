var db = require("./firebase").database();

let ticketsRef = db.ref("tickets");

module.exports = function saveTicket(ticketInfo) {
	ticketsRef.push(ticketInfo);
};
