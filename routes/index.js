var survey = require('../libs/survey');
var broadcast = require('../libs/broadcast');

exports.index = function(req, res){
  res.render('index', { wait: false });
  broadcast.beginQuestionnaire();
};

var questionIndex = 0;
var responses = {};

exports.getFeedBack = function(req, res) {
  console.log("index=" + questionIndex);
  var question = survey.questions[questionIndex];
  if(question !== undefined) {
	  var viewToRender = 'feedmeback-' + question.type.id;
	  res.render(viewToRender, { question: question, index: questionIndex });
  } else {
	  console.log("Thank You !!");
	  res.render("thankyou", {});
  }
};

exports.showFeedBacks = function(req, res) {
	res.render('feedbacks', {});
};

exports.postAnswer = function() {
	return function(req, res) {
		console.log("Question Index Answered = " + req.body.qNo);
		console.log("Feedback Given = " + req.body.answer);
		
		var qNo = req.body.qNo;
		var response = req.body.answer;
		
		if(!responses[qNo]) {
			responses[qNo] = [];
		}
		responses[qNo].push(response);
		
		broadcast.updateFeedback(qNo, response);
		
        //And forward to success page
		res.render('index', { wait: true });
	};
};
