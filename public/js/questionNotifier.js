// creating a new websocket
var socket = io.connect('http://localhost:3000');

socket.on('connect', function () {
	socket.on('question', function(data) {
	
		var formQuestion = document.getElementById('qCtr');
	
		React.renderComponent(window[data.type.tag]({
			query : data.query,
			index : data.index,
			options : data.options,
			info : data.info
		}), formQuestion);
	});
});
