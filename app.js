var express = require('express');
var app = express();
var path = require("path");
var routes = require('./routes');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var levelup = require('levelup');
var db = levelup('db/mykeyboarddb', {valueEncoding : 'json'});
var dbops = require('./db/dbops');

// dbops.printReadStream(db);

app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/db',express.static(path.join(__dirname, 'db')));

//routing 
app.set('view engine', 'pug')
app.use('/', routes);

//listen for entered text on home page
io.on('connection', function (socket) {
	socket.on('entered text', function (textinput) {
		dbops.get(db, textinput, function (value) {
			socket.emit('got entry', value);
		});
	});

});

server.listen(3000);
console.log("Running at Port 3000");

module.exports = app;
