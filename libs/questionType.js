var jade = require('jade');

var QuestionType = function(id, desc) {
	this.id = id;
	this.desc = desc;
};

exports.questionTypeEnum = {
	text: new QuestionType('text', 'input text'),
	multiLine: new QuestionType('multiLine', 'input multi line text'),
	multi: new QuestionType('multi', 'multiple choices'),
	multiWithOther: new QuestionType('multiWithOther', 'multiple choices with other option as well'),
	option: new QuestionType('option', 'single choice'),
	optionWithOther: new QuestionType('optionWithOther', 'single choice with other option as well'),
	rating: new QuestionType('rating', 'rating scale')
};
