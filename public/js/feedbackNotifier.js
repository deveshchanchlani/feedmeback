// creating a new websocket
var socket1 = io.connect('http://localhost:3000/f');

socket1.on('connect', function () {
	socket1.on('feedbacks', function(data) {
	
		if (data.question) {
			var quesDiv = document.getElementById('quesDiv');
			quesDiv.innerHTML = data.question;
		}
		
		var feedDiv = document.getElementById('feedDiv');
		feedDiv.innerHTML += '<br/>' + data.response;
	});
});
