var survey = require('./survey');

var index = 0;

exports.init = function(io) {
	this.io = io;
};

exports.beginQuestionnaire = function() {
	var currentQuestion = survey.questions[index];
	currentQuestion.index = index+1;
	
	var sockets = this.io.sockets; 
	
	sockets.on('connection', function (soc) {
		sockets.emit('question', currentQuestion);
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
	
	var sockets = this.io.sockets;
	
	sockets.on('connection', function (soc) {
		sockets.emit('feedbacks', currentFeedback);
	});
};
