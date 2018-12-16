/* eslint-disable no-undef */
let getFilterId = require("../lib/helpers/get-filterid");
let assert = require("chai").assert;

describe("Get Filter ID::", function() {

	it("Gets correct ID for ticket", function() {
		let ticket = {
			"arrivalTime": "2017-11-27T00:35:00.000Z",
			"date": "2017-11-26T05:00:00.000Z",
			"departureTime": "2017-11-26T16:35:00.000Z",
			"destination": {
				"cityId": "128"
			},
			"duration": "PT8H",
			"journeyId": "10799367",
			"origin": {
				"cityId": "123"
			},
			"price": 103
		};
		let filterId = getFilterId(ticket);
		assert.equal(filterId, "112617_123_128");
	});

	it("Accepts valid string::", function() {
		let filterId = getFilterId("112617_123_128");
		assert.equal(filterId, "112617_123_128");
	});

	it("Throws error on invalid string::", function() {
		let filterId = "11d2617_123_128";
		assert.throws(() => getFilterId(filterId), /Invalid/);
	});

});
