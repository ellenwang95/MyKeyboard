var express = require('express');
var app = express();
var path = require("path");

app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/home.html', function (req, res) {
	res.sendFile(path.join(__dirname+'/home.html'));
});

app.listen(3000);
console.log("Running at Port 3000");