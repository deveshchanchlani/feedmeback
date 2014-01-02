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

exports.beginQuestionnaire = function() {
	var currentQuestion = survey.questions[index];
	currentQuestion.index = index + 1;

	var sockets = this.io.sockets;

	sockets.on('connection', function(socket) {

		var hs = socket.handshake;
		console.log("*********************Session Id:" + hs.sessionID);
		currentQuestion.uid = hs.sessionID;

		sockets.emit('question', currentQuestion);
	});
};

var currentQNo = 0;
exports.updateFeedback = function(qNo, response) {
	var currentFeedback = {};

	if (currentQNo !== qNo) {
		currentFeedback.question = survey.questions[qNo - 1].query;
		currentQNo = qNo;
	}

	currentFeedback.response = response;

	var sockets = this.io.sockets;

	sockets.on('connection', function(socket) {
		sockets.emit('feedbacks', currentFeedback);
	});
};
