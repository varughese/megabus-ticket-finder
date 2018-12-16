let express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	server = require('http').Server(app),
	io = require('socket.io')(server);

let config = require('./lib/config');

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

app.use(morgan('dev'));

let apiRoutes = require('./server/routes/api')(app, express, io);
app.use('/api', apiRoutes);

server.listen(config.PORT);
console.log('Magic happening on port', config.PORT);
