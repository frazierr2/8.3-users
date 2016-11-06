var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

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
//   getInitialState: function(){
//     return {
//       message: ''
//     }
//   },
//
//   handleMessage: function(e){
//     var message = e.target.value;
//     this.setState({message: message})
//     this.props.handleMessage(message)
//   },
//
//   handleSubmit: function(e){
//     e.preventDefault();
//     this.props.handleSubmit();
//     this.setState({message: ''});
//   },
//
//
//     render: function(){
//       var self = this;
//       var username = localStorage.getItem('username');
//       return (
//         <div className="row col-md-12">
//           <h1>Oh User!</h1>
//           <form onSubmit={self.handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="formGroupExampleInput">Example label</label>
//               <input onChange={self.handleMessage} type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
//             </div>
//             <button type="Submit" className="btn btn-danger btn-lg btn-block">Say Something</button>
//           </form>
//         </div>
//
//       );
//     }
// });

var ChatList = React.createClass({
  getInitialState: function(){
  return {
    message: []
  };
},
componentWillMount: function(){
  var self = this;
  $.ajax('https://thefraz.herokuapp.com/classes/Message').then(displayData);
  function displayData(data){
    self.setState({message: data.results});
  }
},
render: function(){
  var messages = this.state.message;
  console.log(messages);
  var messageList = messages.map(function(data){
    return (
      <tr key={data.objectId}>
        <th>{data.username}</th>
        <td>{data.message}</td>
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
//   getInitialState: function(){
//     return{
//       message: []
//     }
//   },
//
//   componentWillMount: function(){
//     var self = this;
//     $.ajax('https://thefraz.herokuapp.com/classes/Message').then(message);
//     function message(data){
//       self.setState({message: data.results});
//     }
//   },
//
//     render: function(){
//       var message = this.state.message;
//       var messageWindow = message.map(function(data){
//         return (
//           <li key={data.objectId || data.createdAt}>{data.username}: {data.message}</li>
//         )
//       });
//       return (
//         <ul>{messageWindow}</ul>
//       )
//     }
// });



var ChatContainer = React.createClass({
  handleMessagePost: function(messageData){
    //console.log(messageData);
    var data = {
      'username': messageData.username,
      'message': messageData.message
    };
    $.post('https://thefraz.herokuapp.com/classes/Message', data).then(function(response){
      //console.log(response);
    });
  },
  render: function(){
    return (
      <TemplateContainer>
        <ChatList />
        <ChatInput handleMessagePost={this.handleMessagePost}/>
      </TemplateContainer>
    );
  }
});

//   getInitialState: function(){
//     return {
//       message: '',
//     }
//   },
//
//   componentWillMount: function(){
//     var self = this;
//     var token = localStorage.getItem('token');
//       $.ajaxSetup({
//         beforeSend: function(xhr){
//           xhr.setRequestHeader('X-Parse-Application-Id', 'ryansparseserver');
//           xhr.setRequestHeader('X-Parse-REST-API-Key', 'ryansapikey');
//           if(token){
//             xhr.setRequestHeader('X-Parse-Session-Token', token);
//           }
//         }
//       });
//
//   },
//
//   handleMessage: function(message){
//     this.setState({message: message});
//   },
//
//   handleSubmit: function(){
//     var messageData = {
//       username: localStorage.getItem('username'),
//       message: this.state.message
//     }
//     $.post('https://thefraz.herokuapp.com/classes/Message', messageData).then(function(response){
//       // console.log(response);
//     });
//   },
//   render:function(){
//     return(
//       <TemplateContainer>
//         <ChatList />
//         <ChatInput handleMessage={this.handleMessage} handleSubmit={this.handleSubmit}/>
//       </TemplateContainer>
//     );
//   }
// });


module.exports = {
  ChatContainer: ChatContainer
}
