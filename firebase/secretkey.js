let private_key = process.env.FB_PRIVATE_KEY;

let pk = ["-----BEGIN PRIVATE KEY-----",
"MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVchyACg2yUDG3",
"Zq8w2+SYbJBlEmxx3z32nP9OAWjwGYh2d0xNIS00lF9f6XcQd2OHktRLHyS2x8nw",
"6RpO6xElAptBBL3F+nZJFAF8gwBBk3TCFjWdbRQYJLNBQ5zbAQT6rPjimp0iMdk6",
"B/95oy2g1JE+XeCjzQpLCTUQ4CNmxKs2pjqZ7DW7PjyAaFRZU0eGPrGcBjydNaRq",
"9OpoW1LH27UBCdstNvJEDcdjFWqI7NPCdW7GMm0uNUPY9PqyYWhDCPuVT+b3tKtc",
"Xj0pCxwywrl/XjyXyQyKS5RNuTR4dwdxfwv/sXmW1GcpRbZKYsGY/irds0B/SO3t",
"KgUrpLTvAgMBAAECggEAQcRTCIHkHymth2F4DY9nnTCBpwkhkkdFNIdIz2JNdQQ3",
"irLbcEH+a9oz0riifiucMGiMZnbRKGLp2swqmLpX9CqeelGE1mBvt59HPC1GapVi",
"15sAg0QiiLF19W201KgxMcP3T3ntVsQLLb+hTT1jchi5xnF3z34HXpgxsziAO9P6",
"ogQ/3698cJrkmV+Z4sfXbzrNHQNwLG8l9oelhJeXTC3gvGgEK+1q3Lf3YxW2F3Df",
"6kpxScQl2XSug9/xge2yZ5Aljcio373G9PDvmGSkx2cMSjmVeXZE3385EPIotXc3",
"gXWlzpgpyMD4ID9Dz5Byndv2YMXV+4Ma8SenYuODyQKBgQDLEqZwH0U0bC/c3BIr",
"KZ0o7uMJmeg187Dj5ZvzmmvlGD0X7L2zr5fn6szmuOHrAw9r7uLLR77O5/aDQ5tE",
"7vl6paGfAo6yoByL8uHizc171Lq8N1zSLrRSSm61zgq7zM3xX8aOuiX9nSFB44Yl",
"nfgKfZ/bBVx7q8uHzgrNBcqvhQKBgQC8ZV+zJyQx1aBFUAc0Tg/NoVwGqpDfy1EE",
"iJmFSK8abcYj6nmK00okFGbgOr2+hC29yp9TmNGxM7vBvcKLRhkc7Eg5AblFqkDD",
"6wtjlbTcD0hak79qHf16R8ePpkYCg2F2x2O6RqeXjf0YP8MiA8iUfJ7QQpqBdg7A",
"nNcD3KZq4wKBgCbhl0R4eEOlQzTCXigte43Oz2GTOka6NfAskkN+GZJvpaLjDR9O",
"S4N4DWtPktHwcA92Wa4aOopbF3PiieQU7WdyNxO+5ZuF1HFnO6C1Ttaa0HYhE4Ca",
"uKPY5IGixaNXf0br05SYR5Xbc/atnY2uRUOc8fJ5gE+dgQariJ3gsgIRAoGBALHV",
"o2NyVCkydQpYg6Rs91/sq/ii8wQ9YKm94+S7eoahDoMCp15TGk46b+3DpS58iMz5",
"wjHgNDhoFBjK7iQXtEboBzjAlsna7y3A5kxHmaSMTIkrpGkgDBBsR0Ui+D0RFWRQ",
"zKOeZD6cSkekkKbAGYuIo0UFSeFgtoY8xn4fv3tvAoGBAIS9EWNQBgBqN47Fr85J",
"e3Rdzv2wO6F/qyqRD9+vNfc8hDxda2SLVXZ0l6m/mWp5qcU7x2ejBl1Z6lx0U4zF",
"RVotsEu2w6oNcAdqzcP3hoWZf07wRaYdpa6NqJkrK0Cf35Rdm3NcPzk8gFO7t0KR",
"r+S8GxEbV4O/3T1MLDd/bjGc",
"-----END PRIVATE KEY-----"];

console.log("PRIVATE KEY:::");
console.log(private_key);

module.exports = {
  "type": "service_account",
  "project_id": "megabus-ticket-tracker",
  "private_key_id": process.env.FB_PRIVATE_KEY_ID,
  "private_key": private_key,
  "client_email": process.env.FB_CLIENT_EMAIL,
  "client_id": "112567519630224098537",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lq8nn%40megabus-ticket-tracker.iam.gserviceaccount.com"
};
