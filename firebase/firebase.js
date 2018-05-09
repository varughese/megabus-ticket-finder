require('dotenv').config();

const firebase = require('firebase-admin');
const config = require('../lib/config');

const serviceAccount = require('./secretkey.js');

firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: config.FIREBASE_URL
});

module.exports = firebase;
