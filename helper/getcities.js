var request = require("request-promise");
var fs = require("fs");


request("https://us.megabus.com/journey-planner/api/origin-cities")
	.then(function(data) {
		var locationHash = {};

		if(!data) {
			console.error("No data found");
			return;
		}

		JSON.parse(data).forEach(function(city) {
			var cityName = city.name.split(",")[0];
			locationHash[cityName.toUpperCase()] = {
				id: city.id,
				name: city.name
			};
		});

		fs.writeFile('lib/locations/idmap.json', JSON.stringify(locationHash), function(err) {
		  if (err) throw err;
		  console.log('The file has been saved!');
		});
	});
// get from API
