var survey = require('../libs/survey');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

var questionIndex = 0;

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

exports.postAnswer = function() {
	return function(req, res) {
		//TODO: record answer
		console.log("Question Answered = " + req.body.qNo);
		console.log("Feedback Given = " + req.body.answer);
		
		questionIndex++;
		//set the header so the address bar doesn't still say /adduser
        res.location("feedmeback");
        //And forward to success page
        res.redirect("feedmeback");
	};
};
