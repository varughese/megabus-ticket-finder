let firebase;
let closeFirebase = require("../firebase/go-offline");

var assert = require("chai").assert;


describe("Firebase::", function() {
	this.timeout(200);

	beforeEach(function() {

	});

	it("Connects to database::", function(done) {
		firebase = require("../firebase/firebase.js").database();
		let ref = firebase.ref("/jawn");
		assert(ref);
		closeFirebase();
		done();
	});

});
