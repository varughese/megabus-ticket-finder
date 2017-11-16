module.exports = {
  "type": "service_account",
  "project_id": "megabus-ticket-tracker",
  "private_key_id": process.env.FB_PRIVATE_KEY_ID,
  "private_key": process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FB_CLIENT_EMAIL,
  "client_id": "112567519630224098537",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lq8nn%40megabus-ticket-tracker.iam.gserviceaccount.com"
};
