$(document).ready(function() {

	var socket = io.connect(serverConfig.socketioServerUrl);

	socket.on('connect', function() {
		socket.on('question', function(data) {

			var formQuestion = $('#qCtr')[0];

			React.renderComponent(window[data.type.tag]({
				query : data.query,
				index : data.index,
				uid : data.uid,
				options : data.options,
				info : data.info
			}), formQuestion);
		});
	});

	$('#formQuestion').on('submit', function(event) {
		event.preventDefault();
		
		var moreInfo = $('#hidInfo')[0].value.split('|');

		var responseData = {
			qNo : moreInfo[0],
			uid : moreInfo[1],
			response : $('#answer')[0].value
		};

		socket.emit('answer', responseData);
		
		var formQuestion = $('#qCtr')[0];
		formQuestion.style.visibility = "hidden";
		
		var waitText = $('#waitText')[0];
		waitText.style.visibility = "visible";

		return false;
	});
});
