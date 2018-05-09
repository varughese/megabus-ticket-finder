let firebase = require('../firebase');
let db = firebase.database();

let usersRef = db.ref('users');

function sanitizeEmail(email) {
	return email
		.replace(/@/g, "_at_")
		.replace(/\./g, "_dot_")
		.replace(/\$/g, "_cash_")
		.replace(/#/g, "_lb_")
		.replace(/\[/g, "_lbrack_")
		.replace(/\]/g, "_rbrack_");
}

function newUser(data) {
	let userEmail = sanitizeEmail(data.email);
	return usersRef.child(`${userEmail}`);
}

function addSubscription(data) {
	let userEmail = sanitizeEmail(data.email);
	let filterId = data.filterId;
	return usersRef.child(`${userEmail}/subscriptions`).push(filterId);
}

module.exports = {
	newUser: newUser,
	addSubscription: addSubscription
};