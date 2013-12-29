var survey = require('./survey');

var index = 0;

exports.init = function(socket) {
	this.socket = socket;
};

exports.begin = function() {
	var currentQuestion = survey.questions[index];
	currentQuestion.index = index+1;
	
	this.socket.sockets.on('connection', function (soc) {
		soc.emit('question', currentQuestion);
	});
};
