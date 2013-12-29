/**
 * @jsx React.DOM
 */

// creating a new websocket
var socket = io.connect('http://localhost:3000');

// on every message recived we print the new datas inside the #container div
socket.on('question', function(data) {
	// document.getElementById('formQuestion').innerHTML = data.query;

	var formQuestion = document.getElementById('formQuestion');
	React.renderComponent(window[data.type.tag]({
		query : data.query,
		index : data.index,
		options : data.options,
		info : data.info
	}), formQuestion);
});

var textQTag = React.createClass({
	render : function() {
		return (<div>
				      <h6>Question {this.props.index}.</h6>
				      <p>{this.props.query}</p>
				      <input type="text" name="answer" placeholder="answer" size="70" required/>
				      <input id="qNo" type="hidden" placeholder="qNo" value="{this.props.index}" name="qNo"/>
				      <br/>
				      <input type="submit" value="Submit"/>
			      </div>
			    );
	}
});
