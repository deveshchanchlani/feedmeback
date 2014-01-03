var cookie = require('cookie');
var connect = require('connect');

var survey = require('./survey');

var index = 0;
var clients = [];

exports.init = function(io) {
	this.io = io;

	this.io.set('authorization', function(handshakeData, accept) {

		if (handshakeData.headers.cookie) {

			handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);

			handshakeData.sessionID = connect.utils.parseSignedCookie(
							handshakeData.cookie['express.sid'], 'Feed Me Back');

			if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
				return accept('Cookie is invalid.', false);
			}
		} else {
			return accept('No cookie transmitted.', false);
		}

		accept(null, true);
	});
};

var broadCastQuestion = function(sockets) {
	var currentQuestion = survey.questions[index];
	currentQuestion.index = index + 1;

//	var sockets = this.io.sockets;

	sockets.on('connection', function(socket) {

		var hs = socket.handshake;
		console.log("*********************Session Id:" + hs.sessionID);
		currentQuestion.uid = hs.sessionID;

		sockets.emit('question', currentQuestion);
	});
};

exports.beginQuestionnaire = function() {
	broadCastQuestion(this.io.sockets);
};

exports.nextQuestion = function() {
	index++;
	broadCastQuestion(this.io.sockets);
};

var questionTitleDisplayed = [];

exports.updateFeedback = function(qNo, clientId, response) {
	var currentFeedback = {
		response: response,
		responseId: qNo + '|' + clientId
	};
	
	if(questionTitleDisplayed.indexOf(qNo) === -1) {
		currentFeedback.question = survey.questions[qNo - 1].query;
		questionTitleDisplayed.push(qNo);
	}

	var sockets = this.io.sockets;

	sockets.on('connection', function(socket) {
		sockets.emit('feedbacks', currentFeedback);
	});
};
