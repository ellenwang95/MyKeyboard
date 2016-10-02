var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require("path");
var bodyParser = require('body-parser');
var levelup = require('levelup');
var db = levelup('db/mykeyboarddb', {valueEncoding : 'json'});
var dbops = require('./db/dbops');

// dbops.printReadStream(db);
// dbops.renameKey(db, 'q', 'quit');

app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/db',express.static(path.join(__dirname, 'db')));

//routing 

//keyboard page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

//home page 
app.get('/home.html', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/home.html'));
});

//db ops page 
app.get('/dbops.html', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/dbops.html'));
});

app.post('/newentry', function (req, res) {
	dbops.add(db, req.body.word, req.body.firstline, req.body.link, req.body.maincontent);
  	res.send('You sent the entry for word "' + req.body.word + '".');
});

app.post('/readentry', function (req, res) {
	dbops.get(db, req.body.word, function (value) {
		res.send(value);
	});
});

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
