function Journey(data) {
	this.journeyId = data.journeyId;
	this.arrivalDateTime = new Date(data.arrivalDateTime);
	this.duration = data.duration;
	this.price = data.price;
	this.origin = {
		cityName: data.origin.cityName,
		cityId: data.origin.cityId,
		stopName: data.origin.stopName,
		stopId: data.origin.stopId
	};
	this.destination = {
		cityName: data.destination.cityName,
		cityId: data.destination.cityId,
		stopName: data.destination.stopName,
		stopId: data.destination.stopId
	};
	this.legs = data.legs.map(function(leg) {
		return new JourneyLeg(leg);
	});
	this.promotionCodeStatus = data.promotionCodeStatus;
	this.cheapestPrice = data.cheapestPrice;
	this.routeName = data.routeName;
	this.lowStockCount = data.lowStockCount;
}

module.exports = Journey;
