function todaysDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	return dd+'/'+mm+'/'+yyyy;
}

var add = function(db, word, firstline, link, maincontent) {
	word = word.toLowerCase();
	var value = {
		firstline: firstline,
		link: link,
		maincontent: maincontent,
		date: todaysDate()
	};
	db.put(word, value, function (err) {
		if (err) return console.log('some I/O error AH!', err);
		console.log("Added value: ", value);
	});
}

var get = function(db, word, callback) {
	word = word.toLowerCase();
	db.get(word, function (err, value) {
		if (err) {
			console.log("Word not found: " + word);
			callback({ error: true });
		} else {
			console.log("Found word: ", word);
			// console.log("Value: ", value);
			callback(value); //use retrieved value
		}
		
	});
}

var del = function(db, word) {
	db.del(word, function (err) {
		if (err) return console.log('some I/O error AH!', err);
		console.log("Deleted: ", word);
	});
}

var printReadStream = function(db) {
	db.createReadStream({  
	  limit     : 100           // maximum number of entries to read
	  , keys      : true          // see db.createKeyStream()
	  , values    : true          // see db.createValueStream()
	}).on('data', function (data) {
	      console.log("key:", data.key);
	      console.log("value:", data.value);
	    });
}


module.exports = {
  add: add,
  get: get,
  del: del,
  printReadStream: printReadStream
};