var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');


var LoginContainer = require('./components/login.jsx').LoginContainer;
var ChatContainer = require('./components/messages.jsx').ChatContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'chat/': 'chat'
  },

  index: function(){
    ReactDOM.render(
      React.createElement(LoginContainer, {router: this}),
      document.getElementById('app')
    );
  },
  chat: function(){
    ReactDOM.render(
      React.createElement(ChatContainer, {router: this}),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
