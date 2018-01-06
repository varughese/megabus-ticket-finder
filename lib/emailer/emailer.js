require("dotenv").config();

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const moment = require("moment");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: 'megabus.ticket.finder@gmail.com',
		pass: process.env.GMAIL_PASSWORD
	}
});


function getHtmlPath(type) {
	return path.join(__dirname, "single-ticket-update.html");
}

function formatTicket(ticket) {
	let dt = moment(ticket.departureTime).format("hh:mm");
	let at = moment(ticket.arrivalTime).format("hh:mm");
	let dd = moment(ticket.date).format('ddd MM/DD/YY');

	return Object.assign(ticket, {
		departureTime: dt,
		arrivalTime: at,
		date: dd
	});
}

function getHtml(type, ticket) {
	const htmlPath = getHtmlPath(type);
	const source = fs.readFileSync(htmlPath, "utf8");
	const template = Handlebars.compile(source);
	return template(formatTicket(ticket));
}

module.exports = function(emails, type, ticket) {
	return new Promise(function(resolve, reject) {
		let mailOptions = {
			from: "Megabus Ticket Finder",
			to: emails,
			subject: `Cheap Ticket found ${ticket.origin.cityName} to ${ticket.destination.cityName}`,
			html: getHtml(type, ticket)
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.error(error);
				reject(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
			resolve(info);
		});
	});
};
