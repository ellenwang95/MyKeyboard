var inputResponses = {
	"hello": "<b>it's me...</b> </br> I mean, how are you",
	"yo": "What's uuupppp",
	"ew": "Hi! My full name is Ellen Wang (E.W., e.w., ew.. you get it).",
	"education": "Software Engineering, University of Waterloo, Class of 2018. Currently on exchange in Denmark (DTU)!",
	"secrets": "\"There was never any secret in here. I stay true to you always. :')\" <a href=\"https:\/\/www.youtube.com\/watch?v=tXSyuDcvNoY\" target=\"_blank\">[x]</a>",
	"sleep": "It's 4:32AM as I type this out..",
	":q": "If you're sure you wanna leave.. <a href=\"./index.html\">[x]</a>"
};

window.onload = function() {
    var textinput = document.getElementById("textinput"); 
	textinput.addEventListener("keyup", showResponse, false);
};

function showResponse(e) {
	var key = e.which || e.keyCode;
    if (key === 13) { // enter
    	if(inputResponses[textinput.value.toLowerCase()]) {
    		$("#textinputdiv").animate({'bottom': '200'}, 1000);
	    	fadeInNewContent(inputResponses[textinput.value.toLowerCase()]);
    	} else {
    		$("#textinputdiv").animate({'bottom': '150'}, 1000);
    		fadeInNewContent("Nothing in the bank for that yet.");
    	}
    }
}

function fadeInNewContent(response) {
	$("#content").fadeOut(function() {
	  	$(this).html(response).fadeIn();
	});
}
