let firebase;


var assert = require("chai").assert;


describe.skip("Firebase::", function() {
	this.timeout(200);
	let closeFirebase = require("../firebase/go-offline");

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
