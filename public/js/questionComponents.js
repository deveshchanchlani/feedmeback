/**
 * @jsx React.DOM
 */

var textQTag = React.createClass({
	render : function() {
		return (<div>
				      <h6>Question {this.props.index}.</h6>
				      <p>{this.props.query}</p>
				      <input type="text" name="answer" placeholder="answer" size="70" required/>
				      <input id="hidInfo" type="hidden" placeholder="hidInfo" value={this.props.index + '|' + this.props.uid} name="hidInfo"/>
				      <br/>
				      <input type="submit" value="Submit"/>
			      </div>
			    );
	}
});
