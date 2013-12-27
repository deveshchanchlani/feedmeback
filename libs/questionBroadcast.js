var survey = require('./survey');

var index = 0;

exports.init = function(socket) {
	this.socket = socket;
};

exports.begin = function() {
//	this.socket.volatile.emit('question', survey.questions[index]);
	
	this.socket.sockets.on('connection', function (soc) {
		soc.emit('question', survey.questions[index]);
	});
};
