class TicketFinderContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tickets: [],
			loading: false
		};

		this.getTickets = this.getTickets.bind(this);
		this.updateTickets = this.updateTickets.bind(this);
		
		let THIS = this;
		if(socket) {
			socket.on('new_ticket', function (ticket) {
				ticket.from = ticket.origin.cityId == THIS.state.originId;
				THIS.setState({
					loading: true,
					tickets: THIS.state.tickets.concat([ticket])
				});
			});
		}
	}

	getTickets(options) {
		this.setState({ loading: true, originId: options.originId, tickets: [] });
		client.getTickets(options)
			.then(this.updateTickets)
		;
	}

	updateTickets(data) {
		let tickets = data.tickets ? data.tickets : data;
		console.log(tickets);
		this.setState({
			loading: false
		});
	}

	render() {
		return (
			<div>
				<SearchOptions getTickets={this.getTickets} loading={this.state.loading}/>
				<TicketList tickets={this.state.tickets} loading={this.state.loading} />
				<EmailAlertOptions />
			</div>
		);
	}
}

class SearchOptions extends React.Component {
	constructor(props) {
		super(props);
		var today = new Date();
		this.state = {
			originId: "127",
			destinationId: "128",
			latestAvailable: true,
			start: today.toISOString().slice(0,10),
			end: new Date(today.setFullYear(today.getFullYear() + 1)).toISOString().slice(0,10),
			days: [true,false,false,false,false,false,false],
			bothWays: false,
			"maxPrice": 40
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.getTickets = this.getTickets.bind(this);
	}

	getTickets(event) {
		event.preventDefault();
		let dayString = "";
		this.state.days.forEach((day, dayIndex) => {
			if(day) dayString += dayIndex;
		});
		let opts = Object.assign({}, this.state, {
			days: dayString
		});
		this.props.getTickets(opts);
	}


	handleInputChange(event) {
		const target = event.target;
		const isCheckbox = target.type === 'checkbox';
		const value = isCheckbox ? target.checked : target.value;
		const name = target.name;

		if(isCheckbox) {
			var dayIndex = target.attributes["data-day-index"];
			if(dayIndex) {
				const index = Number(dayIndex.value);
				const days = this.state.days.map((day, i) => {
					return i === index ? !day : day;
				});
				this.setState({
					days: days
				});
			} else {
				this.setState({
					[name]: value
				});
			}
			
		} else {
			this.setState({
				[name]: value
			});
		}
	}

	render() {
		
		return (
			<form className="ui form" onSubmit={this.getTickets}>
				<div className="field">
					<div className="four fields">
						<div className="four wide field">
							<label>Origin</label>
							<select name="originId" className="ui dropdown fluid" defaultValue={this.state.originId} id="departing" onChange={this.handleInputChange}>
								{window.cities.map(city => <option key={city.id} value={city.id}>{city.name}</option> )}
							</select>
						</div>
						<div className="four wide field">
							<label>Destination </label>
							<select className="ui dropdown fluid" name="destinationId" id="returning" defaultValue={this.state.destinationId} onChange={this.handleInputChange}>
								{window.cities.map(city => <option key={city.id} value={city.id}>{city.name}</option> )}
							</select>
						</div>
						<div className="two wide field">
							<label>Max Price</label>
							<input placeholder="Max Price" type="number" name="maxPrice" value={this.state.maxPrice} onChange={this.handleInputChange}></input>
						</div>
						<div className="four wide field">
							<label>Start Date</label>
							<input type="date" name="start" value={this.state.start} onChange={this.handleInputChange}></input>
						</div>
					</div>
				</div>
				<div className="field">
					<label>Days</label>
					<div className="six fields">
						{/* <input name="days" value={this.state.days} onChange={this.handleInputChange}></input> */}
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[1]} name="days" data-day-index="1" onChange={this.handleInputChange} type="checkbox" />
							<label>Su</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[2]} name="days" data-day-index="2" onChange={this.handleInputChange} type="checkbox" />
							<label>M</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[3]} name="days" data-day-index="3" onChange={this.handleInputChange} type="checkbox" />
							<label>T</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[4]} name="days" data-day-index="4" onChange={this.handleInputChange} type="checkbox" />
							<label>W</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[5]} name="days" data-day-index="5" onChange={this.handleInputChange} type="checkbox" />
							<label>Th</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[6]} name="days" data-day-index="6" onChange={this.handleInputChange} type="checkbox" />
							<label>F</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[0]} name="days" data-day-index="0" onChange={this.handleInputChange} type="checkbox" />
							<label>S</label>
						</div>
					</div>
				</div>
				<div>
					<b>Optional:</b>
				</div>
				<div className="two fields">
					<div className="four wide field">
						<label>End Date</label>
						<input type="date" name="end" value={this.state.end} onChange={this.handleInputChange}></input>
					</div>
					<div className="two wide field">
						<div className="ui checkbox one wide field">
							<input checked={this.state.bothWays} name="bothWays" onChange={this.handleInputChange} type="checkbox" />
							<label>Roundtrip?</label>
						</div>
					</div>
					
				</div>
				<div className="form-group">
					<button className="ui primary button" onClick={this.getTickets} disabled={this.props.loading}>Search</button>
				</div>
			</form>
		);
	}
}

class TicketList extends React.Component {
	render() {
		const tickets = this.props.tickets.sort((a,b) => {
			return new Date(a.date) - new Date(b.date);
		}).map((ticket) => {
			return <Ticket {...ticket} key={ticket.journeyId + ticket.departureTime}/>;
		});

		var res = [];

		if(this.props.loading)
			res.push(<div>Loading</div>);

		if(tickets.length)
			res.push(<div className="ticket-list">{tickets}</div>)
		
		if(res.length)
			return <div>{res[0]}{res[1]}</div>;
		else
			return <div>Search Above!</div>;
	}
}

class Ticket extends React.Component {
	render() {
		function formatTime(time) {
			var d = new Date(time);
			var hr = d.getHours();
			var min = d.getMinutes();
			if (min < 10) {
				min = "0" + min;
			}
			var ampm = "AM";
			if( hr > 12 ) {
				hr -= 12;
				ampm = "PM";
			}
			if(hr == 0) hr = 12
			return hr + ":" + min + ampm;
		}

		function formatDate(date) {
			var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			var d = new Date(date);
			return days[d.getDay()] + " " + (d.getMonth()+1) + "/" + d.getDate();
		}

		return (
			<div className={"ticket item " + (this.props.from ? "ticket-origin" : "ticket-dest")}>
				<div className="content">
					<div className="ticket-section header ">
						<div className="travel-line travel-line-date">
							<span className="ticket-date">{formatDate(this.props.date)}</span>
							<span className="ticket-price">${this.props.price}</span>
						</div>
						<div className="travel-line travel-line-time">
							{formatTime(this.props.departureTime)} - {formatTime(this.props.arrivalTime)}
						</div>
					</div>
					<div className="ticket-section">
						<div className="travel-line travel-line-route">
							{this.props.origin.cityName} --> {this.props.destination.cityName}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class EmailAlertOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			originId: "127",
			destinationId: "128",
			email: "",
			start: new Date().toISOString().slice(0,10),
			"maxPrice": 20
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.addSubscriber = this.addSubscriber.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
		this.addSubscriber = this.addSubscriber.bind(this)
	}

	addSubscriber() {
		client.newSubscriber(Object.assign({}, this.state));
	}

	render() {
		return (
			<div className="email-alert">
			<div>Would you like to be emailed when a price is low on a certain day? Enter information here:</div>
			<form className="ui form" onSubmit={this.addSubscriber}>
				<div className="field">
					<div className="four fields">
						<div className="four wide field">
							<label>Origin</label>
							<select name="originId" className="ui dropdown fluid" defaultValue={this.state.originId} id="departing" onChange={this.handleInputChange}>
								{window.cities.map(city => <option key={city.id} value={city.id}>{city.name}</option> )}
							</select>
						</div>
						<div className="four wide field">
							<label>Destination </label>
							<select className="ui dropdown fluid" name="destinationId" id="returning" defaultValue={this.state.destinationId} onChange={this.handleInputChange}>
								{window.cities.map(city => <option key={city.id} value={city.id}>{city.name}</option> )}
							</select>
						</div>
						<div className="two wide field">
							<label>Price</label>
							<input placeholder="Max Price" type="number" name="maxPrice" value={this.state.maxPrice} onChange={this.handleInputChange}></input>
						</div>
						<div className="four wide field">
							<label>Date</label>
							<input type="date" name="start" value={this.state.start} onChange={this.handleInputChange}></input>
						</div>
					</div>
				</div>
				<div className="field one field">
					<div className="eight wide field">
						<label>Email</label>
						<input placeholder="email" type="email" name="email" value={this.state.email} onChange={this.handleInputChange}></input>
					</div>
					<div className="form-group">
					<button className="ui primary button" onClick={this.addSubscriber}>Subscribe</button>
					</div>
				</div>
			</form>
			</div>
		)
	}
}

ReactDOM.render(
  <TicketFinderContainer />,
  document.getElementById('content')
);
