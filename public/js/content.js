// creating a new websocket
var socket = io.connect('http://localhost:3000');

// on every message recived we print the new datas inside the #container div
socket.on('question', function(data) {
	// document.getElementById('formQuestion').innerHTML = data.query;

	var formQuestion = document.getElementById('formQuestion');
	React.renderComponent(window[data.type.tag]({
		query : data.query,
		index : data.index,
		options : data.options,
		info : data.info
	}), formQuestion);
});
