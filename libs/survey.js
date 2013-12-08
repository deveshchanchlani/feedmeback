var questionType = require('./questionType');

var questionTypeEnum = questionType.questionTypeEnum;

exports.questions = 
[
 	{
 		query: "One word for the trainer",
 		type: questionTypeEnum.text
 	}, {
 		query: "Few Paras for the trainer",
 		type: questionTypeEnum.multiLine
 	}, {
 		query: "You have multiple choices",
 		type: questionTypeEnum.multi,
 		options: ['excellent', 'very good', 'good', 'poor']
 	}, {
 		query: "You have multiple choices with Other option",
 		type: questionTypeEnum.multiWithOther,
 		options: ['excellent', 'very good', 'good', 'poor']
 	}, {
 		query: "You have one of multiple choices",
 		type: questionTypeEnum.option,
 		options: ['excellent', 'very good', 'good', 'poor']
 	}, {
 		query: "You have one of multiple choices",
 		type: questionTypeEnum.optionWithOther,
 		options: ['excellent', 'very good', 'good', 'poor']
 	}, {
 		query: "Rate the Session",
 		type: questionTypeEnum.rating,
 		options: ['5', '4', '3', '2', '1'],
 		info: "5 being highest, and 1 being lowest."
 	}
];
