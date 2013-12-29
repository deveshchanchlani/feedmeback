// creating a new websocket
var socket1 = io.connect('http://192.168.2.5:3000/f');

socket1.on('feedbacks', function(data) {

	if (data.question) {
		var quesDiv = document.getElementById('quesDiv');
		quesDiv.innerHTML = data.question;
//		React.renderComponent(Question({
//			query : data.question
//		}), container);
	}
	
//	React.renderComponent(Feedback({
//		response : data.response
//	}), container);
	var feedDiv = document.getElementById('feedDiv');
	feedDiv.innerHTML += '<br/>' + data.response;
	
	
	
	
//	var resElm = document.createElement('p');
//	resElm.className = 'response';
//	resElm.innerHTML = data.response;
//	container.appendChild(resElm);
});
