var survey = require('./survey');

var index = 0;

exports.init = function(io) {
	this.io = io;
};

exports.beginQuestionnaire = function() {
	var currentQuestion = survey.questions[index];
	currentQuestion.index = index+1;
	
//	this.io.sockets.on('connection', function (soc) {
//		soc.emit('question', currentQuestion);
//	});
	
	this.io.of('/q').on('connection', function (soc) {
//		soc.on('connect', function(currentQuestion){
			soc.emit('question', currentQuestion);
//		});
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
	
//	this.io.sockets.on('connection', function (soc) {
//		soc.emit('feedbacks', currentFeedback);
//	});
	
	this.io.of('/f').on('connection', function (soc) {
//		soc.on('connect', function(currentFeedback){
			soc.emit('feedbacks', currentFeedback);
//		});
	});
};
