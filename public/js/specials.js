var specialContent = {
	"hobbies": "I tend to have phases where I read almost every day for a few months, and others where I just stop reading completely. I'm trying to make it a consistent habit to [read] every day. <br><br>"
};

var isSpecial = function(input) {
	return (input in specialContent);
}

var getSpecialContent = function(key) {
	return specialContent[key];
}