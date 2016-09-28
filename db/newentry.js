function addNewEntry() {
	var elements = document.getElementById("entryform").elements;
	alert(elements[word] + "\n" + elements[firstline] + "\n" + elements[link]
		+ "\n" + elements[maincontent]);
	// add(elements[word], elements[firstline], elements[link], elements[maincontent]);
	db.close();
}
