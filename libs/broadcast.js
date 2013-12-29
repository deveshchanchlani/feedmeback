var survey = require('./survey');

var index = 0;

exports.init = function(socket) {
	this.socket = socket;
};

exports.beginQuestionnaire = function() {
	var currentQuestion = survey.questions[index];
	currentQuestion.index = index+1;
	
//	this.socket.sockets.on('connection', function (soc) {
//		soc.emit('question', currentQuestion);
//	});
	
	this.socket.of('/q').on('connection', function (soc) {
		soc.emit('question', currentQuestion);
	});
};

var currentQNo = 0;
exports.updateFeedback = function(qNo, response) {
	var currentFeedback = {};
	
	if(currentQNo !== qNo) {
		currentFeedback.question = survey.questions[qNo-1].query;
		currentQNo = qNo;
	}
	
	currentFeedback.response = response;
	
//	this.socket.sockets.on('connection', function (soc) {
//		soc.emit('feedbacks', currentFeedback);
//	});
	
	this.socket.of('/f').on('connection', function (soc) {
		soc.emit('feedbacks', currentFeedback);
	});
};
