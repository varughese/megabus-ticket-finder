window.client = (function() {
	function getTickets(opts) {
		const qs = `?originId=${opts.originId}&destinationId=${opts.destinationId}&start=${opts.start}&days=${opts.days}&maxPrice=${opts.maxPrice}`;
		const url = `/api/tickets/${qs}`;
		return fetch(url, {
			headers: {
				Accept: 'application/json'
			}
		}).then(checkStatus).then(parseJSON);
	}

	function createTimer(data) {
		return fetch('/api/timers', {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(checkStatus);
	}

	function updateTimer(data) {
		return fetch('/api/timers', {
			method: 'put',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(checkStatus);
	}

	function deleteTimer(data) {
		return fetch('/api/timers', {
			method: 'delete',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(checkStatus);
	}

	function checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			const error = new Error(`HTTP Error ${response.statusText}`);
			error.status = response.statusText;
			error.response = response;
			console.log(error);
			throw error;
		}
	}

	function parseJSON(response) {
		return response.json();
	}
	return {getTickets};
}());
