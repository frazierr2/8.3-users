var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
require('backbone-react-component');

var TemplateContainer = require('./template.jsx').TemplateContainer;
var MessagesCollection = require('../models/message').MessagesCollection;

var token = localStorage.getItem('token');

$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader("X-Parse-Application-Id", "ryansparseserver");
    xhr.setRequestHeader("X-Parse-REST-API-Key", "ryansapikey");
    xhr.setRequestHeader("X-Parse-Session-Token", token);
  }
});

var ChatInput = React.createClass({
  getInitialState: function(){
    return {
      message: ''
    };
  },
  handleMessage: function(e){
    var message = e.target.value;
    this.setState({message: message});
  },
  handleMessagePost: function(e){
    e.preventDefault();
    var messageData = {
      username: localStorage.getItem('username'),
      message: this.state.message
    };
    this.props.handleMessagePost(messageData)
    this.setState({message: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleMessagePost} className="form-horizontal well">
        <div className="form-group">
          <label htmlFor="messageInput" className="control-label">Message</label>
          <div>
            <input onChange={this.handleMessage} value={this.state.message} type="text" className="form-control" id="messageInput" placeholder="Your message here" />
          </div>
        </div>
        <div className="form-group">
          <div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </div>
        </div>
      </form>
    );
  }
});

var ChatList = React.createClass({

render: function(){
  var messages = this.props.collection;
  // var messages = this.state.message;

  var messageList = messages.map(function(data){
    return (
      <tr key={data.get("objectId") || data.cid}>
        <th>{data.get("username")}</th>
        <td>{data.get("message")}</td>
      </tr>
    )
  })
  return (
    <table className="table">
      <tbody>
        {messageList}
      </tbody>
    </table>
  );
}
});

var ChatContainer = React.createClass({
  getInitialState: function(){
    return {
      collection: new MessagesCollection()
    };
  },
  componentWillMount: function(){
    var self = this;
    var collection = new MessagesCollection();
    collection.fetch().then(function(){
      self.setState({collection: collection})
    });
  },
  handleMessagePost: function(messageData){
    //console.log(messageData);
    var data = {
      'username': messageData.username,
      'message': messageData.message
    };
    this.state.collection.create(data);
    this.setState({collection: this.state.collection});

  },
  render: function(){
    return (
      <TemplateContainer>
        <ChatList collection={this.state.collection}/>
        <ChatInput handleMessagePost={this.handleMessagePost}/>
      </TemplateContainer>
    );
  }
});



module.exports = {
  ChatContainer: ChatContainer
}
