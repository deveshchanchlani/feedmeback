var survey = require('../libs/survey');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

var questionIndex = 0;

exports.getFeedBack = function(req, res) {
  var question = survey.questions[questionIndex];
  var viewToRender = 'feedmeback-' + question.type.id;
  res.render(viewToRender, { question: question, index: questionIndex });
};