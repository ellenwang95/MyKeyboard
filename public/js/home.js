var socket = io.connect();

//listen for keyboard events
window.addEventListener("keyup", function (event) {
	var textinput = document.getElementById("textinput"); 
	if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      textinput.focus();
    }
    if (event.which === 13) { // enter
    	socket.emit('entered text', textinput.value.toLowerCase());
    }
}, false); 

//listen for socket events from server
socket.on('got entry', function (retrievedentry) {
    $("#textinput").select();
    if(retrievedentry.hasOwnProperty("error")) {
        $("#textinputdiv").animate({'bottom': '150'}, 1000);
        fadeInNewLine("Nothing in the bank for that yet.");
    } else {
        $("#textinputdiv").animate({'bottom': '200'}, 1000);
        fadeInNewContent(retrievedentry);
    }
});

function fadeInNewLine(line) {
    $("#firstline, #link, #maincontent").fadeOut(function() {
        $("#firstline").html(line).fadeIn();
    }); 
}

function fadeInNewContent(entry) {
    $("#maincontent, #link, #firstline").fadeOut().promise().done(function() {
        var linkhref = entry.link ? entry.link : "";
        var linktext = entry.link ? "[x]" : "";
        var maincontent = entry.maincontent ? entry.maincontent : ""; 

        $("#firstline").html(entry.firstline).fadeIn();
        $("#link").prop('href', linkhref);
        $("#link").text(linktext).fadeIn();
        $("#maincontent").html(maincontent).fadeIn();
    });
}