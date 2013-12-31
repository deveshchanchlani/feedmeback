// creating a new websocket
var socket = io.connect(serverConfig.socketioServerUrl);

socket.on('connect', function () {

	socket.on('feedbacks', function(data) {
	
		if (data.question) {
			var quesDiv = document.getElementById('quesDiv');
			quesDiv.innerHTML = data.question;
		}
		
		var feedDiv = document.getElementById('feedDiv');
		feedDiv.innerHTML += '<br/>' + data.response;
	});
});
