let helpers = require("../lib/ticketbuilder/set-date-helpers");
let assert = require("chai").assert;
let moment = require("moment");
let mocks = require("./mocks/datehelpers.mock.json");

describe("Date Methods::", function() {

	describe("Get List of Dates::", function() {
		it("Single day increment::", function() {
			let startDate = moment(new Date("10/14/17")),
				endDate = moment(new Date("10/28/17"));

			let dateslist = helpers.getDatesList({}, startDate, endDate);

			assert.deepEqual(dateslist, mocks.dayIncrement);
		});

		it("Weekends::", function() {
			let startDate = moment(new Date("10/14/17")),
				endDate = moment(new Date("11/28/17"));

			let dateslist = helpers.getDatesList({ weekends: true }, startDate, endDate);
			assert.deepEqual(dateslist, mocks.weekends);
		});

		it("Thursdays::", function() {
			let startDate = moment(new Date("10/14/17")),
				endDate = moment(new Date("11/28/17"));

			let dateslist = helpers.getDatesList({ days: [4] }, startDate, endDate);
			assert.deepEqual(dateslist, mocks.thursdays);
		});

	});
});
