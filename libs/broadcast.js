var cookie = require('cookie');
var connect = require('connect');

var survey = require('./survey');

var index = 0;
var clients = [];
var socketsio = null;

var responses = {};

var authorize = function() {
	socketsio
			.set(
					'authorization',
					function(handshakeData, accept) {

						if (handshakeData.headers.cookie) {

							handshakeData.cookie = cookie
									.parse(handshakeData.headers.cookie);

							handshakeData.sessionID = connect.utils
									.parseSignedCookie(
											handshakeData.cookie['express.sid'],
											'Feed Me Back');

							if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
								return accept('Cookie is invalid.', false);
							}
						} else {
							return accept('No cookie transmitted.', false);
						}

						accept(null, true);
					});
};

var addResponseListener = function() {
	socketsio.sockets.on('connection', function(socket) {

		socket.on('answer', function(responseData) {

			var qNo = responseData.qNo;
			var uid = responseData.uid;
			var response = responseData.response;

			console.log("Question Index Answered = " + qNo);
			console.log("Session Uid = " + uid);
			console.log("Feedback Given = " + response);

			if (!responses[qNo]) {
				responses[qNo] = {};
			}
			if (!responses[qNo][uid]) {
				responses[qNo][uid] = response;

				updateFeedback(qNo, uid, response);
			}
		});

	});
};

exports.init = function(io) {
	socketsio = io;

	authorize();
	addResponseListener();
};

var broadCastQuestion = function(sockets) {
	var currentQuestion = survey.questions[index];
	currentQuestion.index = index + 1;

	sockets.on('connection', function(socket) {

		var hs = socket.handshake;
		console.log("*********************Session Id:" + hs.sessionID);
		currentQuestion.uid = hs.sessionID;

		sockets.emit('question', currentQuestion);
	});
};

exports.beginQuestionnaire = function() {
	broadCastQuestion(socketsio.sockets);
};

exports.nextQuestion = function() {
	index++;
	broadCastQuestion(socketsio.sockets);
};

var questionTitleDisplayed = [];

var updateFeedback = function(qNo, clientId, response) {
	var currentFeedback = {
		response : response,
		responseId : qNo + '|' + clientId
	};

	if (questionTitleDisplayed.indexOf(qNo) === -1) {
		currentFeedback.question = survey.questions[qNo - 1].query;
		questionTitleDisplayed.push(qNo);
	}

	socketsio.sockets.emit('feedbacks', currentFeedback);
};

exports.updateFeedback = updateFeedback;
