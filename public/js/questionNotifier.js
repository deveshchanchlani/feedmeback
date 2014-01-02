// creating a new websocket
var socket = io.connect(serverConfig.socketioServerUrl);

socket.on('connect', function () {
	socket.on('question', function(data) {
	
		var formQuestion = document.getElementById('qCtr');
	
		React.renderComponent(window[data.type.tag]({
			query : data.query,
			index : data.index,
			uid: data.uid,
			options : data.options,
			info : data.info
		}), formQuestion);
	});
});
