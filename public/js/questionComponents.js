/**
 * @jsx React.DOM
 */

var textQTag = React.createClass({
	render : function() {
		return (<div>
				      <h6>Question {this.props.index}.</h6>
				      <p>{this.props.query}</p>
				      <input type="text" name="answer" placeholder="answer" size="70" required/>
				      <input id="qNo" type="hidden" placeholder="qNo" value={this.props.index} name="qNo"/>
				      <br/>
				      <input type="submit" value="Submit"/>
			      </div>
			    );
	}
});
