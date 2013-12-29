var questionTypeFactory = require('./questionTypeFactory');

exports.questions = 
[
 	{
 		query: "One word for the trainer",
 		type: questionTypeFactory.text
 	}, {
 		query: "Few Paras for the trainer",
 		type: questionTypeFactory.multiLine
 	}, {
 		query: "You have multiple choices",
 		type: questionTypeFactory.multi,
 		options: ['excellent', 'very good', 'good', 'poor']
 	}, {
 		query: "You have multiple choices with Other option",
 		type: questionTypeFactory.multiWithOther,
 		options: ['excellent', 'very good', 'good', 'poor']
 	}, {
 		query: "You have one of multiple choices",
 		type: questionTypeFactory.option,
 		options: ['excellent', 'very good', 'good', 'poor']
 	}, {
 		query: "You have one of multiple choices",
 		type: questionTypeFactory.optionWithOther,
 		options: ['excellent', 'very good', 'good', 'poor']
 	}, {
 		query: "Rate the Session",
 		type: questionTypeFactory.rating,
 		options: ['5', '4', '3', '2', '1'],
 		info: "5 being highest, and 1 being lowest."
 	}
];
