// Makes some route calls

var request = require("request");
var fs = require("fs");
var depature_date = "2017-10-13";

var city_ids = {

};

var CITY = {
  PHL: 127,
  PITT: 128,
  PSU: 137
};

var ENDPOINTS = {
  TRAVEL_DATES: {
    url: "https://us.megabus.com/journey-planner/api/journeys/travel-dates",
    qs: {
      originCityId: CITY.PITT,
      destinationCityId: CITY.PHL
    }
  },
  JOURNEY_DETAILS: {
    url: "https://us.megabus.com/journey-planner/api/journeys",
    qs: {
      originId: CITY.PITT,
      destinationId: CITY.PHL,
      departureDate: depature_date,
      totalPassengers: 1,
      concessionCount: 0,
      nusCount: 0,
      days: 1
    }
  }
};

request(ENDPOINTS.JOURNEY_DETAILS)
  .then(function(data) {
    console.log(data);
  })
  // .pipe(fs.createWriteStream('journey-details.json'));
