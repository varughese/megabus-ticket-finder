require("dotenv").config();

const admin = require("firebase-admin");
const config = require("../lib/config");

const serviceAccount = require("./secretkey.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FIREBASE_URL
});

const db = admin.database();

module.exports = db;
