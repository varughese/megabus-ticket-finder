![Megabus Ticket Finder](https://i.imgur.com/qwyBbqT.png)
[![Build Status](https://travis-ci.org/varughese/megabus-ticket-finder.svg?branch=master
)](https://travis-ci.org/varughese/megabus-ticket-finder)

## What is this?
Megabus is a bus line that offers really cheap tickets. Finding these "cheap" tickets however is really cumbersome and tedious on their website.

This project aims to solve this problem by wrapping [megabus](http://us.megabus.com)'s internal API.

This is for educational purposes.

## Web App
#### Here is a web app I really quickly hacked together with React: [https://megabus-ticket-finder.herokuapp.com/](https://megabus-ticket-finder.herokuapp.com/)
Just for fun, it uses `socket.io` so the frontend gets updated real time when the backend finds each new ticket. It is pretty buggy, but I put it in there to demonstrate how easy it would be to add a feature like that.

## How to Use
If you would like to use this with Node, you can! 

Download this project. The `lib` folder has what you need. I have all my tickets cache into a `Firebase` database. You can either ignore this or connect to your own database. (Look at `firebase/secretkey.js`, `dotenv`, and `config.js`)

```js
const TicketFinder = require("./lib").TicketFinder;
const Route = require("./lib").Route;

let finder = new TicketFinder({
	start: "TODAY",
	// start: "2017-11-17",
	latestAvailable: true,
	// end: "2017-12-20",
	// weekends: true,
	// totalPassengers: 2
	days: [4,5,6]
}, [ new Route("PSU", "Pittsburgh") ]);

```

This will create a `TicketFinder` object. The second parameter is the date options, and has documentation you can find [here](https://github.com/varughese/megabus-ticket-finder/blob/master/lib/helpers/dateopts.md). The second parameter can be a list of new `Routes`.

```js
finder.getTicketsInPriceRange(0, 10)
	.then(function(payload) {
		payload.tickets.forEach(function(ticket) {
			console.log(ticket.toString());
		});
	})
```

Heres what this will produce ![Terminal Window](https://i.imgur.com/AfG6y6D.png)

### Features
- Search Megabus tickets to save money
- Set up email alerts triggered by price
- Track price history of tickets

The email alerting system actually does work. I turned it off on the Heroku server, but if you clone the repository you can see how it would work.

There is some documentation on the design of the database and some logic behind some of the complicated mechanisms of the project [here](https://github.com/varughese/megabus-ticket-finder/blob/master/docs/database.md).

I wrote a Medium article when I first started this project if you are interested [here](https://medium.com/@matvarughese3/creating-a-megabus-scraper-with-node-a7074973c1ab).

I also got 50 Megabus tickets for free by using this program. Read more [here](https://medium.com/@matvarughese3/how-i-got-50-megabus-tickets-for-free-8744b59227e9).
