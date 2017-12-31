# Database
The chosen Database is Firebase, for no reason other than I wanted to try it out. It worked well, because I am not doing any complicated queries and it allows me to easily show non-CS people the basics of how this works.

The hardest part to figure out was probably the `subscriptions` table.

There are 4 major "tables".

| Name 	| Description 	|
|------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `tickets` 	| Every ticket has a `journeyId` defined by the Megabus database. This is used as the "primary key" in this table. Tickets are unique based on their departure date, origin, and destination.  	|
| `ticket_history` 	| Every time a new ticket is added, a "transaction" history of sorts is maintained. So this table has the history of each ticket price. 	|
| `subscriptions` 	| This maps filters to a list of "subscriptions". A "subscription" contains a user's email, and the filters they chose when they created a price alert. 	|
| `users` 	| This contains a list of subscriptions each user is subscribed to 	|


## tickets
```json
{
	"10799051": {
		"arrivalTime": "2017-11-25T00:35:00.000Z",
		"date": "2017-11-24T05:00:00.000Z",
		"departureTime": "2017-11-24T21:45:00.000Z",
		"destination": "128",
		"duration": "PT2H50M",
		"journeyId": "10799051",
		"origin": "137",
		"price": 25
	}
}
```

## ticket_history
```json
{
	"10799081": {
		"-KzghDyXqPeVuH0667UX": {
			"price": 19,
			"timestamp": 1511504802344
		},
		"-L-axQruKzkv2N2m50YL": {
			"price": 29,
			"timestamp": 1512482127518
		}
	}
}
```

## subscriptions
```json
{
	"20171124_127_128": {
		"tickets": [10799051],
		"subscribers": [
			{ "email": "mav120@pitt.edu", "price": 10},
			{ "email": "bol@jawn.edu", "price": 1}
		]
	}
}
```

## users
```json
{
	"mav120@pitt.edu": {
		"subscribed": ["20171124_127_128"]
	}
}
```
