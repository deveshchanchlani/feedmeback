var socket = io.connect(serverConfig.socketioServerUrl);

var responseIDs = [];

socket.on('connect', function() {

	socket.on('feedbacks', function(data) {

		if (responseIDs.indexOf(data.responseId) === -1) {
			if (data.question) {
				var quesDiv = document.getElementById('quesDiv');
				quesDiv.innerHTML = data.question;
			}

			var feedDiv = document.getElementById('feedDiv');
			feedDiv.innerHTML += '<br/>' + data.response;
			
			responseIDs.push(data.responseId);
		}
	});
});
