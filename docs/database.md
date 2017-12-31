# Database Design
The chosen Database is Firebase, for no reason other than I wanted to try it out. It worked well, because I am not doing any complicated queries and it allows me to easily show non-CS people the basics of how this works.

The hardest part to figure out was probably the `subscriptions` table.

There are 4 major "tables".

| Name 	| Description 	|
|------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `tickets` 	| Every ticket has a `journeyId` defined by the Megabus database. This is used as the "primary key" in this table. Tickets are unique based on their departure date, origin, and destination.  	|
| `ticket_history` 	| Every time a new ticket is added, a "transaction" history of sorts is maintained. So this table has the history of each ticket price. 	|
| `subscriptions` 	| This maps filters to a list of "subscriptions". A "subscription" contains a user's email, and the filters they chose when they created a price alert. 	|
| `users` 	| This contains a list of subscriptions each user is subscribed to 	|

## Examples
#### tickets
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

#### ticket_history
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

#### subscriptions
```json
{
	"112417_127_128": {
		"tickets": [10799051],
		"subscribers": [
			{ "email": "mav120@pitt.edu", "price": 10},
			{ "email": "bol@jawn.edu", "price": 1}
		]
	}
}
```

#### users
```json
{
	"mav120@pitt.edu": {
		"subscribed": ["20171124_127_128"]
	}
}
```

## Logic
Did someone say, [Logic](https://genius.com/artists/Logic)? Eventually I will make diagrams for this with LucidChart, but for now some bullets will suffice.

### New Ticket Price Change
Example Ticket:
```json
{
	"arrivalTime" : "2017-12-30T00:35:00.000Z",
	"date" : "2017-12-29T05:00:00.000Z",
	"departureTime" : "2017-12-29T21:45:00.000Z",
	"destination" : "128",
	"duration" : "PT2H50M",
	"journeyId" : "10799081",
	"origin" : "137",
	"price" : 29
}
```

- Update `tickets`
- Update `ticket_history`
- Convert into "Filter String": `"20171229_137_128`
- Upsert to `subscriptions.tickets` using filter string as id
- If subscribers, loop through, check if updated price meets alert requirements for each. If so, email those users.

### New Ticket Price Change
Example Ticket:
```json
{
	"arrivalTime" : "2017-12-30T00:35:00.000Z",
	"date" : "2017-12-29T05:00:00.000Z",
	"departureTime" : "2017-12-29T21:45:00.000Z",
	"destination" : "128",
	"duration" : "PT2H50M",
	"journeyId" : "10799081",
	"origin" : "137",
	"price" : 29
}
```

- Update `tickets`
- Update `ticket_history`
- Convert into "Filter String": `"122917_137_128`
- Upsert to `subscriptions.tickets` using filter string as id
- If subscribers, loop through, check if updated price meets alert requirements for each. If so, email those users.

### New Price Alert Request
Example "User Story": I want to be emailed if there is a ticket on 2/2/18 below $10 from Philly to Pitt at bol@jawn.edu.

- Convert expression into "Filter String": `"020218_127_128"`.
- Add to `subscriptions` table, `{ email: "bol@jawn.edu", price: 10}`
- Add "Filter String" to `users` : `{ email: "bol@jawn.edu", subscriptions: "020218_127_128" }`

**Subscriptions**
```json
"020218_127_128": {
	"tickets": [],
	"subscribers": [
		{ "email": "bol@jawn.edu", "price": 10 }
	]
}
```

**Users**
```json
"bol@jawn.edu": {
	"subscriptions": ["020218_127_128"]
}
```

## Design Decisions
Wrapping Megabus's API and making calls to it and listing when there are $1 tickets. That stuff is easy. What is hard is thinking about the design of this kind of thing.

I knew from the inception of this project that I was going to make some sort of email/price alert system. I like perfection, so I spent a good amount of time thinking about the most efficient and most elegant way to track the subscriptions. Eventually I decided to just try something out and see how it goes.
