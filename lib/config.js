module.exports = {
	API_DATE_FORMAT: 'YYYY-MM-DD',
	SHORT_DATE_FORMAT: 'M/D/YY',
	LONG_DATE_FORMAT: 'ddd MM/DD/YY',
	TIME_FORMAT: 'hh:mmA',
	API_URL: "https://us.megabus.com/journey-planner/api/",
	PORT: process.env.PORT || 8080,
	DB_URL: 'mongodb://localhost:27017/megabustest',
	DAY_RANGE: 15,
	FIREBASE_URL: 'https://megabus-ticket-tracker.firebaseio.com/',
	BOOKMARKS: {
		GITHUB: "https://github.com/varughese/megabus-ticket-finder",
		FIREBASE: "https://console.firebase.google.com/project/megabus-ticket-tracker/database/megabus-ticket-tracker/data"
	}
};
