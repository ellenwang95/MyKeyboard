var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var levelup = require('levelup');
var db = levelup('db/mykeyboarddb');
var dbops = require('./db/dbops');
var app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/db',express.static(path.join(__dirname, 'db')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/home.html', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/home.html'));
	console.log("test");
});


//////
app.get('/dbops.html', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/dbops.html'));
});

app.post('/newentry', function(req, res) {
	dbops.add(db, req.body.word, req.body.firstline, req.body.link, req.body.maincontent);
  	res.send('You sent the entry for word "' + req.body.word + '".');

  	req.on('close', function() {
    	db.close();
  	});
});
///////

app.listen(3000);
console.log("Running at Port 3000");

module.exports = app;
