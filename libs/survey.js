var questionType = require('./questionType');

var questionTypeEnum = questionType.questionTypeEnum;

exports.questions = 
[
 	{
 		query: "One word for the trainer",
 		type: questionTypeEnum.text
 	}
];
