var specialContent = {
	"hobbies": "I tend to have phases where I read almost every day for a few months, and others where I just stop reading completely. I'm trying to make it a consistent habit to <a onclick='fadeInSpecialEntry(\"reads\")'><b>[read]</b></a> every day. <br><br>",
	"reads": "Here are my reads."

};

function fadeInSpecialEntry(key) {
	$("#maincontent, #link, #firstline, #errorline, #specialcontent").fadeOut().promise().done(function() {
		$("#textinput").val(key).fadeIn();
		$("#textinput").select();
    	$("#specialcontent").html(getSpecialContent(key)).fadeIn();
    });
}

var isSpecial = function(input) {
	return (input in specialContent);
}

var getSpecialContent = function(key) {
	return specialContent[key];
}