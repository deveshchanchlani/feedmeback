window.onload = function() {

	// creating a new websocket
	var socket = io.connect('http://localhost');

	// on every message recived we print the new datas inside the #container div
	socket.on('question', function(data) {
		document.getElementById('container').innerHTML = data.query;
	});
};
