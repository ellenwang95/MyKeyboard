function todaysDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	return dd+'/'+mm+'/'+yyyy;
}

var add = function(db, word, firstline, link, maincontent) {
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

var get = function(db, word) {
	db.get(word, function (err, value) {
		if (err) return console.log('Key not found! :(', err);
		console.log("Found word: " + word);
		return value;
	})
}

// var del = function(db, word) {
// 	db.del(word, function (err) {
// 		if (err) return console.log('some I/O error AH!', err);
// 	});
// }

module.exports = {
  add: add,
  get: get
};