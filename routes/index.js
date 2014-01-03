var survey = require('../libs/survey');
var broadcast = require('../libs/broadcast');

exports.index = function(req, res) {
	res.render('index', {
		wait : false
	});
	broadcast.beginQuestionnaire();
};

var responses = {};

exports.showFeedBacks = function(req, res) {
	res.render('feedbacks', {});
};

exports.postAnswer = function() {
	return function(req, res) {
		var moreInfo = req.body.hidInfo.split('|');
		var qNo = moreInfo[0];
		var uid = moreInfo[1];

		console.log("Question Index Answered = " + qNo);
		console.log("Session Uid = " + uid);
		console.log("Feedback Given = " + req.body.answer);

		var response = req.body.answer;

		if (!responses[qNo]) {
			responses[qNo] = {};
		}
		if (!responses[qNo][uid]) {
			responses[qNo][uid] = response;

			broadcast.updateFeedback(qNo, uid, response);
		}

		// And forward to success page
		res.render('index', {
			wait : true
		});
	};
};

exports.nextQuestion = function(req, res) {
	broadcast.nextQuestion();
};
