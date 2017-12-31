let moment = require("moment");
let config = require("../config");

function Ticket(data) {
	this.origin = data.origin;
	this.destination = data.destination;
	this.date = data.date;
	this.departureTime = data.departureDateTime || data.departureTime;
	this.arrivalTime = data.arrivalDateTime || data.arrivalTime;
	this.price = data.price;
	this.duration = data.duration;
	this.journeyId = data.journeyId;
}

Ticket.prototype.toString = function() {
	return "[" + this.date.format(config.LONG_DATE_FORMAT) + "]   " + "(" +
	this.departureTime.format(config.TIME_FORMAT) + " - " + this.arrivalTime.format(config.TIME_FORMAT) +
	")   " + "[" + this.origin.cityCode + "-->" + this.destination.cityCode + "]   "+"$" + this.price;
};

Ticket.prototype.getFilterId = function() {
	return `${moment(this.date).format("MMDDYY")}_${this.origin.cityId}_${this.destination.cityId}`;
};

Ticket.prototype.toJson = function() {
	var oid = this.origin.cityId,
		did = this.destination.cityId,
		d = this.date.toJSON(),
		dT = this.departureTime.toJSON(),
		aT = this.arrivalTime.toJSON();

	return Object.assign({}, this, { origin: oid, destination: did, date: d, departureTime: dT, arrivalTime: aT } );
};

Ticket.prototype.toHtml = function() {

	return `<div class="ticket" style="margin-bottom: 2px;border: 1px solid #ddd;padding: 5px;color: white;background: #333;">
				<div class="ticket-section" style="display: inline-block;margin-right: 5px;padding: 2px 5px;font-family: Courier;font-size: 14px;">
					<span class="travel-line travel-line-date" style="text-decoration: underline;color: white;margin-right: 14px;">
						${this.date.format(config.LONG_DATE_FORMAT)}
					</span>
					<span class="travel-line travel-line-time">
						${this.departureTime.format(config.TIME_FORMAT)} - ${this.arrivalTime.format(config.TIME_FORMAT)}
					</span>
				</div>
				<div class="ticket-section" style="display: inline-block;margin-right: 5px;padding: 2px 5px;font-family: Courier;font-size: 14px;">
					<span class="travel-line travel-line-route" style="text-decoration: underline;color: white;margin-right: 14px;">
						[${this.origin.cityCode} --> ${this.destination.cityCode}]
					</span>
					<span class="travel-line travel-line-price" style="color: #76ff76;">
						$${this.price}
					</span>
				</div>
			</div>`;
};

module.exports = Ticket;
