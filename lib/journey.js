function City(data) {
	this.cityName = data.cityName;
	this.cityId = data.cityId;
	this.stopName = data.stopName;
	this.stopId = data.stopId;
}

function Journey(data) {
	this.journeyId = data.journeyId;
	this.arrivalDateTime = new Date(data.arrivalDateTime);
	this.duration = data.duration;
	this.price = data.price;
	this.origin = new City(data.origin);
	this.destination = new City(data.destination);
	this.legs = data.legs.map(function(leg) {
		return new JourneyLeg(leg);
	});
	this.promotionCodeStatus = data.promotionCodeStatus;
	this.cheapestPrice = data.cheapestPrice;
	this.routeName = data.routeName;
	this.lowStockCount = data.lowStockCount;
}

function JourneyLeg(data) {
	this.carrier = data.carrier;
	this.transportTypeId = data.transportTypeId;
	this.departureDateTime = data.departureDateTime;
	this.arrivalDateTime = data.arrivalDateTime;
	this.duration = data.duration; //"PT7H15M";
	this.origin = new City(data.origin);
	this.destination = new City(data.destination);
}

module.exports = Journey;
