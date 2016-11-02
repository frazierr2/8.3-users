var React = require('react');
var Backbone = require('backbone');

var TemplateContainer = require('./template.jsx').TemplateContainer;


var ChatInput = React.createClass({
    render: function(){
      return (
        <button type="Submit" className="btn btn-danger btn-lg btn-block">Say Something</button>

      );
    }
});

var ChatWindow = React.createClass({
    render: function(){
      return (
        <div className="row col-md-12">
          <h1>Oh User!</h1>
          <div className="text-box"></div>
          <form>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Example label</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>
          </form>
        </div>
      );
    }
});



var ChatContainer = React.createClass({
  render:function(){
    return(
      <TemplateContainer>
        <ChatWindow />
        <ChatInput />
      </TemplateContainer>
    );
  }
});


module.exports = {
  ChatContainer: ChatContainer
}
