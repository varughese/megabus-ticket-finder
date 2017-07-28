function Journey(data) {
  this.journeyId = data.journeyId;
  this.arrivalDateTime = new Date(data.arrivalDateTime);
  this.duration = data.duration;
  this.price = data.price;
  this.origin = new City(data.origin);
  this.destination = new City(data.destination);
  this.legs = data.legs;
  this.promotionCodeStatus = data.promotionCodeStatus;
  this.cheapestPrice = data.cheapestPrice;
  this.routeName = data.routeName;
  this.lowStockCount = data.lowStockCount;
}

module.exports = Journey;
