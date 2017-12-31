const Ticket = require("../classes/ticket");

function _isValidDate(dateString) {
	if(dateString.length !== 6) return false;

	let month = Number(dateString.substring(0, 2)),
		day = Number(dateString.substring(2, 4));

	return month <=12 && month >= 1 && day >= 1 && day <= 31;
}

function _validate(filter) {
	let parts = filter.split("_"),
		valid = parts.length === 3 && _isValidDate(parts[0]);

	if(valid)
		return filter;
	else
		throw new Error("Invalid Filter String!");
}

module.exports = function(input) {
	let type = typeof input;
	if(type === "string") {
		return _validate(input);
	} else {
		let ticket = new Ticket(input);
		return ticket.getFilterId();
	}
};
