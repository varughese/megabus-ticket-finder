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
			ticket.departureTime = ticket.departureTime.slice(11,16);
			ticket.arrivalTime = ticket.arrivalTime.slice(11,16);
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
			days: [true,false,false,false,false,false,false],
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
			const index = Number(target.attributes["data-day-index"].value);
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
							<input checked={this.state.days[0]} name="days" data-day-index="0" onChange={this.handleInputChange} type="checkbox" />
							<label>M</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[1]} name="days" data-day-index="1" onChange={this.handleInputChange} type="checkbox" />
							<label>T</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[2]} name="days" data-day-index="2" onChange={this.handleInputChange} type="checkbox" />
							<label>W</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[3]} name="days" data-day-index="3" onChange={this.handleInputChange} type="checkbox" />
							<label>Th</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[4]} name="days" data-day-index="4" onChange={this.handleInputChange} type="checkbox" />
							<label>F</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[5]} name="days" data-day-index="5" onChange={this.handleInputChange} type="checkbox" />
							<label>S</label>
						</div>
						<div className="ui checkbox one wide field">
							<input checked={this.state.days[6]} name="days" data-day-index="6" onChange={this.handleInputChange} type="checkbox" />
							<label>Su</label>
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
