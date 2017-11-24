function TicketHistoryTransaction(ticket, timestamp) {
	this.price = ticket.price;
	this.timestamp = timestamp;
}

module.exports = TicketHistoryTransaction;
