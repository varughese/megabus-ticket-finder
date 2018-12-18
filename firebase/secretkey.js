module.exports = {
	'type': 'service_account',
	'project_id': 'megabus-ticket-finder',
	'private_key_id': process.env.FIREBASE_PRIVATE_KEY_ID,
	'private_key': process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	'client_email': process.env.FIREBASE_CLIENT_EMAIL,
	"client_id": "107335115715245893666",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mw7sp%40megabus-ticket-finder.iam.gserviceaccount.com"
};