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

    if(isSpecial($("#textinput").val())) {
    	$("#textinputdiv").animate({'bottom': '180'}, 1000);
		fadeInSpecialEntry($("#textinput").val());
    } else if(retrievedentry.hasOwnProperty("error")) {
        $("#textinputdiv").animate({'bottom': '150'}, 1000);
        fadeInErrorLine();
    } else {
        $("#textinputdiv").animate({'bottom': '180'}, 1000);
        fadeInRandomEntry(retrievedentry);
    }
});

function fadeInErrorLine() {
    $("#maincontent, #link, #firstline, #specialcontent").fadeOut(function() {
        $("#errorline").html("Nothing in the bank for that yet.").fadeIn();
    }); 
}

function fadeInRandomEntry(entry) {
    $("#maincontent, #link, #firstline, #specialcontent, #errorline").fadeOut().promise().done(function() {
        var linkhref = entry.link ? entry.link : "";
        var linktext = entry.link ? "[x]" : "";
        var maincontent = entry.maincontent ? entry.maincontent : ""; 

        $("#firstline").html(entry.firstline + "<br><br>").fadeIn();
        $("#link").prop('href', linkhref);
        $("#link").text(linktext).fadeIn();
        $("#maincontent").html(maincontent + "<br><br>").fadeIn();
    });
}

function fadeInSpecialEntry(key) {
	$("#maincontent, #link, #firstline, #errorline").fadeOut().promise().done(function() {
    	$("#specialcontent").html(getSpecialContent(key)).fadeIn();
    });
}
