// // var inputResponses = {
// // 	"hello": "<b>it's me...</b> </br> I mean, how are you",
// // 	"yo": "What's uuupppp",
// // 	"ew": "Hi! My full name is Ellen Wang (E.W., e.w., ew.. you get it).",
// // 	"education": "Software Engineering, University of Waterloo, Class of 2018. Currently on exchange in Denmark (DTU)!",
// // 	"secrets": "\"There was never any secret in here. I stay true to you always. :')\" <a href=\"https:\/\/www.youtube.com\/watch?v=tXSyuDcvNoY\" target=\"_blank\">[x]</a>",
// // 	"sleep": "It's 4:32AM as I type this out..",
// // 	":q": "If you're sure you wanna leave.. <a href=\"./index.html\">[x]</a>"
// // };

var socket = io.connect();
//  // Keyboard events
window.addEventListener("keyup", function (event) {
	var textinput = document.getElementById("textinput"); 
	if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      textinput.focus();
    }
    if (event.which === 13) { // enter
    	socket.emit('entered text', textinput.value.toLowerCase());
    	// if(inputResponses[textinput.value.toLowerCase()]) {
    	// 	$("#textinputdiv").animate({'bottom': '200'}, 1000);
	    // 	fadeInNewContent(inputResponses[textinput.value.toLowerCase()]);
    	// } else {
    	// 	$("#textinputdiv").animate({'bottom': '150'}, 1000);
    	// 	fadeInNewContent("Nothing in the bank for that yet.");
    	// }
    }
}, false); 

//  // Socket events

// Whenever the server emits 'login', log the login message
socket.on('got entry', function (retrievedentry) {
	console.log("GOT ENTRY! " + retrievedentry);
	alert(JSON.stringify(retrievedentry));
});

// // window.onload = function() {
// //     var textinput = document.getElementById("textinput"); 
// // 	window.addEventListener("keyup", showResponse, false);
// // };


// function fadeInNewContent(response) {
// 	$("#content").fadeOut(function() {
// 	  	$(this).html(response).fadeIn();
// 	});
// }