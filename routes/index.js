var broadcast = require('../libs/broadcast');

exports.index = function(req, res) {
	res.render('index', {
		wait : false
	});
	broadcast.beginQuestionnaire();
};

exports.showFeedBacks = function(req, res) {
	res.render('feedbacks', {});
};

exports.nextQuestion = function(req, res) {
	broadcast.nextQuestion();
};
