![Megabus Ticket Finder](https://i.imgur.com/qwyBbqT.png)
[![Build Status](https://travis-ci.org/varughese/megabus-ticket-finder.svg?branch=master
)](https://travis-ci.org/varughese/megabus-ticket-finder)

## What is this?
Megabus is a bus line that offers really cheap tickets. Finding these "cheap" tickets however is really cumbersome and tedious on their website.

This project aims to solve this problem by wrapping [megabus](megabus.com)'s internal API.

It is still under development, so stay tuned!

#### Here is a web app I really quickly hacked together: [https://megabustickerfinder.herokuapp.com/](https://megabustickerfinder.herokuapp.com/) (its not even close to done)

## How to Use
If you would like to use this with Node, you can! The backend "ticket finding" library is not separated from the frontend, but that can be done if a request is made.

Download this project. The `lib` folder has what you need.

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
- Set up price alerts
- Track price history of tickets

There is some documentation on how it will save tickets [here](https://github.com/varughese/megabus-ticket-finder/blob/master/firebase/saving-workflow.md).

I wrote a Medium article when I first started this project if you are interested [here](https://medium.com/@matvarughese3/creating-a-megabus-scraper-with-node-a7074973c1ab).

I also got 50 Megabus tickets for free by using this program. Read more [here](https://medium.com/@matvarughese3/how-i-got-50-megabus-tickets-for-free-8744b59227e9).
