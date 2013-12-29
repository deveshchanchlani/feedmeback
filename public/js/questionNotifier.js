// creating a new websocket
var socket = io.connect('http://192.168.2.5:3000/q');

socket.on('question', function(data) {

	var formQuestion = document.getElementById('qCtr');

	React.renderComponent(window[data.type.tag]({
		query : data.query,
		index : data.index,
		options : data.options,
		info : data.info
	}), formQuestion);
});
