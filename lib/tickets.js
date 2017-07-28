var moment = require("moment");

function Ticket(data) {
  this.origin = data.origin;
  this.destination = data.destination;
  this.date = data.date;
  this.departureTime = data.departureTime;
  this.arrivalTime = data.arrivalTime;
  this.price = data.price;
}

Ticket.prototype.toString = function () {
    return "{$" + this.price + "} " + this.origin + " -> " + this.destination + " (" + moment(this.date).format(const_1.DATE_FORMAT) + " " +
        (moment(this.departureTime).format(const_1.TIME_FORMAT) + " - " + moment(this.arrivalTime).format(const_1.TIME_FORMAT) + ")");
};
