var QuestionType = require('./questionType');

var questionTypeFactory = {
	text: new QuestionType('text', 'textQTag'),
	multiLine: new QuestionType('multiLine', 'multiLineQTag'),
	multi: new QuestionType('multi', 'multiQTag'),
	multiWithOther: new QuestionType('multiWithOther', 'multiWithOtherQTag'),
	option: new QuestionType('option', 'optionQTag'),
	optionWithOther: new QuestionType('optionWithOther', 'optionWithOtherQTag'),
	rating: new QuestionType('rating', 'ratingQTag')
};

module.exports = questionTypeFactory;
