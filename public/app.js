/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-boolean-value */
class TicketFinderContainer extends React.Component {
	render() {
		return (<div>
			<SearchOptions/>
			<TicketList/>
		</div>);
	}
}

class SearchOptions extends React.Component {
	getTickets() {
		console.log("yo");
	}

	render() {
		return (<form onSubmit={this.getTickets}>
			<div class="form-group">
				<label for="departing">Departing</label>
				<select class="form-control" id="departing">
					<option value="128" selected="selected">Pittsburgh</option>
					<option value="127">Philadelphia</option>
					<option value="137">PSU</option>
					<option value="123">New York</option>
				</select>
			</div>
			<div class="form-group">
				<label for="returning">Returning
				</label>
				<select class="form-control" id="returning">
					<option value="128">Pittsburgh</option>
					<option value="127" selected="selected">Philadelphia</option>
					<option value="137">PSU</option>
				</select>
			</div>
			<div class="form-group">
				<button class="btn btn-primary" onclick={this.getTickets}>Go</button>
			</div>
		</form>);
	}
}

class TicketList extends React.Component {
	render() {
		return (<div class="ticket" style="margin-bottom: 2px;border: 1px solid #ddd;padding: 5px;color: white;background: #333;">
			<div class="ticket-section" style="display: inline-block;margin-right: 5px;padding: 2px 5px;font-family: Courier;font-size: 14px;">
				<span class="travel-line travel-line-date" style="text-decoration: underline;color: white;margin-right: 14px;">
					${this.date.format(config.LONG_DATE_FORMAT)}
				</span>
				<span class="travel-line travel-line-time">
					${this.departureTime.format(config.TIME_FORMAT)}
					- ${this.arrivalTime.format(config.TIME_FORMAT)}
				</span>
			</div>
			<div class="ticket-section" style="display: inline-block;margin-right: 5px;padding: 2px 5px;font-family: Courier;font-size: 14px;">
				<span class="travel-line travel-line-route" style="text-decoration: underline;color: white;margin-right: 14px;">
					[${this.origin.cityCode}
					--> ${this.destination.cityCode}]
				</span>
				<span class="travel-line travel-line-price" style="color: #76ff76;">
					$${this.price}
				</span>
			</div>
		</div>
		); } } ReactDOM.render(
		<TicketFinderContainer/>,
  document.getElementById('content')
);
