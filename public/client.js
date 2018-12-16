window.client = (function() {
	function getTickets(opts) {
		let qs = `?originId=${opts.originId}&destinationId=${opts.destinationId}&start=${opts.start}&days=${opts.days}&maxPrice=${opts.maxPrice}&bothWays=${opts.bothWays}`;
		if(opts.end) qs += `&end=${opts.end}`;
		const url = `/api/tickets${qs}`;
		return fetch(url, {
			headers: {
				Accept: 'application/json'
			}
		})
			.then(checkStatus)
			.then(parseJSON)
			.catch(console.error);
	}

	function newSubscriber(opts) {
		console.log(opts);
		fetch('/api/subscriber/', {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(opts)
		})
			.then(checkStatus)
			.then(parseJSON);
	}

	function checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			const error = new Error(`HTTP Error ${response.statusText}`);
			error.status = response.statusText;
			error.response = response;
			console.log(error);
			throw error;
		}
	}

	function parseJSON(response) {
		return response.json();
	}
	return {getTickets, newSubscriber};
}());


window.cities = [{"id":89,"name":"Albany, NY"},{"id":466,"name":"Anaheim, CA"},{"id":91,"name":"Ann Arbor, MI"},{"id":302,"name":"Athens, GA"},{"id":289,"name":"Atlanta, GA"},{"id":320,"name":"Austin, TX"},{"id":143,"name":"Baltimore, MD"},{"id":319,"name":"Baton Rouge, LA"},{"id":93,"name":"Binghamton, NY"},{"id":292,"name":"Birmingham, AL"},{"id":94,"name":"Boston, MA"},{"id":273,"name":"Buffalo Airport, NY"},{"id":95,"name":"Buffalo, NY"},{"id":420,"name":"Burbank, CA"},{"id":96,"name":"Burlington, VT"},{"id":99,"name":"Charlotte, NC"},{"id":290,"name":"Chattanooga, TN"},{"id":100,"name":"Chicago, IL"},{"id":101,"name":"Christiansburg, VA"},{"id":102,"name":"Cincinnati, OH"},{"id":103,"name":"Cleveland, OH"},{"id":454,"name":"Columbia, SC"},{"id":317,"name":"Dallas/Fort Worth, TX"},{"id":465,"name":"Dartmouth UMass, MA"},{"id":106,"name":"Des Moines, IA"},{"id":107,"name":"Detroit, MI"},{"id":131,"name":"Durham, NC"},{"id":316,"name":"Fairhaven/New Bedford, MA"},{"id":469,"name":"Fall River, MA"},{"id":455,"name":"Fayetteville, NC"},{"id":462,"name":"Fort Lauderdale, FL"},{"id":296,"name":"Gainesville, FL"},{"id":110,"name":"Hampton, VA"},{"id":111,"name":"Harrisburg, PA"},{"id":112,"name":"Hartford, CT"},{"id":318,"name":"Houston, TX"},{"id":115,"name":"Indianapolis, IN"},{"id":116,"name":"Iowa City (Coralville), IA"},{"id":295,"name":"Jacksonville, FL"},{"id":118,"name":"Knoxville, TN"},{"id":417,"name":"Las Vegas, NV"},{"id":472,"name":"Lincoln, NE"},{"id":324,"name":"Little Rock, AR"},{"id":390,"name":"Los Angeles, CA"},{"id":298,"name":"Louisville, KY"},{"id":119,"name":"Madison, WI"},{"id":120,"name":"Memphis, TN"},{"id":450,"name":"Miami, FL"},{"id":121,"name":"Milwaukee, WI"},{"id":144,"name":"Minneapolis, MN"},{"id":294,"name":"Mobile, AL"},{"id":473,"name":"Moline, IL"},{"id":293,"name":"Montgomery, AL"},{"id":463,"name":"Montpelier, VT"},{"id":299,"name":"Morgantown, WV"},{"id":291,"name":"Nashville, TN"},{"id":305,"name":"New Brunswick, NJ"},{"id":122,"name":"New Haven, CT"},{"id":303,"name":"New Orleans, LA"},{"id":123,"name":"New York, NY"},{"id":389,"name":"Newark, DE"},{"id":413,"name":"Oakland, CA"},{"id":126,"name":"Omaha, NE"},{"id":297,"name":"Orlando, FL"},{"id":127,"name":"Philadelphia, PA"},{"id":128,"name":"Pittsburgh, PA"},{"id":129,"name":"Portland, ME"},{"id":304,"name":"Princeton, NJ"},{"id":130,"name":"Providence, RI"},{"id":418,"name":"Reno, NV"},{"id":132,"name":"Richmond, VA"},{"id":133,"name":"Ridgewood, NJ"},{"id":416,"name":"Riverside, CA"},{"id":134,"name":"Rochester, NY"},{"id":415,"name":"Sacramento, CA"},{"id":321,"name":"San Antonio, TX"},{"id":414,"name":"San Francisco, CA"},{"id":412,"name":"San Jose, CA"},{"id":135,"name":"Secaucus, NJ"},{"id":419,"name":"Sparks, NV"},{"id":136,"name":"St Louis, MO"},{"id":430,"name":"St. Paul, MN"},{"id":137,"name":"State College, PA"},{"id":139,"name":"Syracuse, NY"},{"id":453,"name":"Tallahassee, FL"},{"id":451,"name":"Tampa, FL"},{"id":470,"name":"Tampa\\Mango (P&R), FL"},{"id":140,"name":"Toledo, OH"},{"id":145,"name":"Toronto, ON"},{"id":475,"name":"Virginia Beach, VA"},{"id":142,"name":"Washington, DC"}];