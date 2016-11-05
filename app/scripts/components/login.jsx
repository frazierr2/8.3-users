var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var TemplateContainer = require('./template.jsx').TemplateContainer;
var UsersCollection = require('../models/user').UsersCollection;


var Login = React.createClass({
  getInitialState: function(){
    var username = '';
    var password = '';
    return {
      username: username,
      password: password
    };
  },
  setUsername: function(e){
    var username = e.target.value;
    this.setState({username: username});
    console.log(username);
  },
  setPassword: function(e){
    var password = e.target.value;
    this.setState({password: password});
    console.log(password);
  },

  setLogin: function(e){
    e.preventDefault();
    var router = this.props.router;
    router.navigate('chat/',{trigger: true});

    var userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.setLogin(userData)
  },

    render: function(){
      var self = this;
      return (
          <div onSubmit={self.setLogin} className="col-md-6">
            <h1>Please login</h1>
            <form id="login">
              <div className="form-group">
                <label htmlFor="signin">Username</label>
                <input onChange={self.setUsername} value={self.state.username} type="text" className="form-control" id="signin" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="signin-password">Password</label>
                <input onChange={self.setPassword} value={self.state.password} type="password" className="form-control" id="signin-password" placeholder="Password" />
              </div>
              <a href="#chat/" className="login-btn btn btn-primary btn-lg btn-block">Sign In</a>
            </form>
          </div>
      );
    }
});


var SignUp = React.createClass({
  getInitialState: function(){
    var username = '';
    var password = '';
    return {
      username: username,
      password: password
    };
  },
  setUsername: function(e){
    var username = e.target.value;
    this.setState({username: username});
    console.log(username);
  },

  setPassword: function(e){
    var password = e.target.value;
    this.setState({password: password});
    console.log(password);
  },

  setSetup: function(e){
    e.preventDefault();

    var userInformation = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.setSetup(userInformation)
  },
    render: function(){
      return (
          <div onSubmit={this.setSetup} className="col-md-6">
            <h1>No Account? Please sign up</h1>
            <form id="signup">
              <div className="form-group">
                <label htmlFor="new-username">Username</label>
                <input onChange={this.setUsername} value={this.state.username} type="text" className="form-control" id="new-username" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">Password</label>
                <input onChange={this.setPassword} value={this.state.password} type="password" className="form-control" id="new-password" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">Create An Account</button>
            </form>
          </div>
      );
    }
});

var LoginContainer = React.createClass({
componentWillMount: function(){
  this.ajaxSetup();
},
ajaxSetup:function(token){
  $.ajaxSetup({
    beforeSend: function(xhr){
      xhr.setRequestHeader('X-Parse-Application-Id', 'ryansparseserver');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'ryansapikey');
      if(token){
        xhr.setRequestHeader('X-Parse-Session-Token', 'token')
      }
    }
  });
},
  setLogin: function(savedLogin){

    var username = savedLogin.username;
    var password = savedLogin.password;
    var self = this;
    var url = 'https://thefraz.herokuapp.com/';

    $.ajax(url + 'login?username=' + username + '&password=' + password).then(function(response){
      localStorage.setItem('username', response.username);
      localStorage.setItem('token', response.sessionToken);
      if (response.sessionToken){
        self.props.router.navigate('chat/', {trigger: true});
      }else{
        alert('Please Sign In!')
      };
    });
  },

  setSetup: function(userData){
    $.post('https://thefraz.herokuapp.com/users' + userData).then(function(response){
      console.log(response);
    });
  },

  render:function(){
    return(
      <TemplateContainer>
        <Login />
        <SignUp setSetup={this.state.setSetup}/>
      </TemplateContainer>
    );
  }
});


module.exports = {
  LoginContainer: LoginContainer
}
