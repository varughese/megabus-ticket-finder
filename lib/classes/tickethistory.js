function TicketHistoryTransaction(ticket, lastUpdated) {
	this.price = ticket.price;
	this.lastUpdated = lastUpdated;
}

module.exports = TicketHistoryTransaction;
