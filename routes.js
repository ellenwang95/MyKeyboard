var express = require('express');
var path = require("path");
var router = express.Router();

//keyboard page
router.get('/', function (req, res) {
	res.render('index');
});

//home page 
router.get('/home', function (req, res) {
	res.render('home', {word: ''}); 
});

router.get('/home/:word', function (req, res) {
	res.render('home', {word: req.params.word});
});

//db ops page 
router.get('/dbops.html', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/dbops.html'));
});

router.post('/newentry', function (req, res) {
	dbops.add(db, req.body.word, req.body.firstline, req.body.link, req.body.maincontent);
  	res.send('You sent the entry for word "' + req.body.word + '".');
});

router.post('/readentry', function (req, res) {
	dbops.get(db, req.body.word, function (value) {
		res.send(value);
	});
});

module.exports = router;
