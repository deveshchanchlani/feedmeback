/**
 * @jsx React.DOM
 */

var Question = React.createClass({
	render : function() {
		return (
			      <p className="question">{this.props.query}</p>
			    );
	}
});

var Feedback = React.createClass({
	render : function() {
		return (
			      <p className="response">{this.props.response}</p>
			    );
	}
});
