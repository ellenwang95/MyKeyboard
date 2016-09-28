var levelup = require('levelup')
//Create our database, supply location and options.
//This will create or open the underlying LevelDB store.
var db = levelup('./db/mykeyboarddb')

function todaysDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	return dd+'/'+mm+'/'+yyyy;
}

function add(word, firstline, link, maincontent) {
	var value = {
		firstline: firstline,
		link: link,
		maincontent: maincontent,
		date: todaysDate()
	};
	db.put(word, value, function (err) {
		 if (err) return console.log('some I/O error AH!', err);
		 console.log("Added word: " + word);
	});
}

function del(word) {
	db.del(word, function (err) {
		if (err) return console.log('some I/O error AH!', err);
	});
}

function get(word) {
	db.get(word, function (err, value) {
		if (err) return console.log('Key not found! :(', err);
		console.log("Found word: " + word);
		return value;
	})
}
