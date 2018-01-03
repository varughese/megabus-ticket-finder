class TicketFinderContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tickets: [],
			loading: false
		};

		this.getTickets = this.getTickets.bind(this);
		this.updateTickets = this.updateTickets.bind(this);
	}

	getTickets(options) {
		this.setState({ loading: true });
		client.getTickets(options)
			.then(this.updateTickets)
		;
	}

	updateTickets(data) {
		let tickets = data.tickets ? data.tickets : data;
		tickets.map((ticket) => {
			ticket.date = ticket.date.slice(0,10);
			ticket.departureTime = ticket.departureTime.slice(11,19);
			ticket.arrivalTime = ticket.arrivalTime.slice(11,19);
			return ticket;
		});
		this.setState({
			loading: false,
			tickets: tickets
		});
	}

	render() {
		return (
			<div>
				<SearchOptions getTickets={this.getTickets}/>
				<TicketList tickets={this.state.tickets} loading={this.state.loading} />
			</div>
		);
	}
}

class SearchOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			originId: "127",
			destinationId: "128",
			latestAvailable: true,
			start: new Date().toISOString().slice(0,10),
			end: false,
			days: "0",
			"maxPrice": 40
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.getTickets = this.getTickets.bind(this);
	}

	getTickets(event) {
		event.preventDefault();
		this.props.getTickets(this.state);
	}


	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<form className="ui form" onSubmit={this.getTickets}>
				<div className="field">
					<div className="five fields">
						<div className="four wide field">
							<label>Origin</label>
							<select name="originId" className="ui dropdown fluid" defaultValue={this.state.originId} id="departing" onChange={this.handleInputChange}>
								<option value="128">Pittsburgh</option>
								<option value="127">Philadelphia</option>
								<option value="137">PSU</option>
								<option value="123">New York</option>
							</select>
						</div>
						<div className="four wide field">
							<label>Destination </label>
							<select className="ui dropdown fluid" name="destinationId" id="returning" defaultValue={this.state.destinationId} onChange={this.handleInputChange}>
								<option value="128">Pittsburgh</option>
								<option value="127">Philadelphia</option>
								<option value="137">PSU</option>
							</select>
						</div>
						<div className="two wide field">
							<label>Max Price</label>
							<input placeholder="Max Price" type="number" name="maxPrice" value={this.state.maxPrice} onChange={this.handleInputChange}></input>
						</div>
						<div className="two wide field">
							<label>Days</label>
							<input name="days" value={this.state.days} onChange={this.handleInputChange}></input>
						</div>
						<div className="four wide field">
							<label>Start Date</label>
							<input type="date" name="start" value={this.state.start} onChange={this.handleInputChange}></input>
						</div>
					</div>
				</div>


				<div className="form-group">
					<button className="ui primary button" onClick={this.getTickets}>Search</button>
				</div>
			</form>
		);
	}
}

class TicketList extends React.Component {
	render() {
		const tickets = this.props.tickets.map((ticket) => {
			return <Ticket {...ticket} key={ticket.journeyId}/>;
		});

		if(this.props.loading)
			return <div>Loading</div>;

		if(tickets.length)
			return <div className="ui relaxed large divided list">{tickets}</div>;
		else
			return <div>Search Above!</div>;
	}
}

class Ticket extends React.Component {
	render() {
		return (
			<div className="ticket item">
				<div className="content">
					<div className="ticket-section header">
						<div className="travel-line travel-line-date">
							{this.props.date} --- <i>${this.props.price}</i>
						</div>
						<div className="travel-line travel-line-time">
							{this.props.departureTime} - {this.props.arrivalTime}
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

ReactDOM.render(
  <TicketFinderContainer />,
  document.getElementById('content')
);
