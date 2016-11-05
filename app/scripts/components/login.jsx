var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var TemplateContainer = require('./template.jsx').TemplateContainer;
var UsersCollection = require('../models/user').UsersCollection;


var Login = React.createClass({
  getInitialState: function(){
      var email = '';
      var password = '';
      return {
        email: email,
        password: password
      }
    },

    handleEmail: function(e){
       var userEmail = e.target.value;
       this.setState({email: userEmail});
     },
     handlePassword: function(e){
       var userPassword = e.target.value;
       this.setState({password: userPassword});
     },

     handleSubmit: function(e){
       e.preventDefault();

       var userInfo = {
         username: this.state.email,
         password: this.state.password
       };
       this.props.handleSubmit(userInfo);
     },

    render: function(){
      var self = this;
      return (
          <div className="col-md-6">
            <h1>Please login</h1>
            <form id="login" onSubmit={self.handleSubmit} >
              <div className="form-group">
                <label htmlFor="signin">Username</label>
                <input onChange={self.handleEmail}  type="text" className="form-control" id="signin" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="signin-password">Password</label>
                <input onChange={self.handlePassword}  type="password" className="form-control" id="signin-password" placeholder="Password" />
              </div>
              <button type="submit" className="login-btn btn btn-primary btn-lg btn-block">Sign In</button>
            </form>
          </div>
      );
    }
});


var SignUp = React.createClass({
  getInitialState: function(){
    var email = '';
    var password = '';

    return {
      email: email,
      password: password
    }
  },
  handleEmail: function(e){
    var userEmail = e.target.value;
    this.setState({email: userEmail});
    // console.log(userEmail);
  },

  handlePassword: function(e){
  var userPassword = e.target.value;
  this.setState({password: userPassword});
},

handleSignUp: function(e){
  e.preventDefault();

  var userData = {
    username: this.state.email,
    password: this.state.password
  };
  // console.log(userData);
  this.props.handleSignUp(userData);

},
    render: function(){
      var self = this;
      return (
          <div className="col-md-6">
            <h1>No Account? Please sign up</h1>
            <form onSubmit={self.handleSignUp} id="signup">
              <div className="form-group">
                <label htmlFor="new-username">Username</label>
                <input onChange={self.handleEmail} type="text" className="form-control" id="new-username" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">Password</label>
                <input onChange={self.handlePassword} type="password" className="form-control" id="new-password" placeholder="Password" />
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
  ajaxSetup: function(token){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'ryansparseserver');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'ryansapikey');
        if(token){
          xhr.setRequestHeader('X-Parse-Session-Token', token);
        }
      }
    });
  },
  handleSubmit: function(userInfo){
    var username = userInfo.username;
    var password = userInfo.password;
    // console.log(userInfo);
    var self = this;
    var url = 'https://thefraz.herokuapp.com/';
  console.log('testing');
    $.ajax(url + 'login?username=' + username + '&password=' + password).then(function(response){
      localStorage.setItem('username', response.username);
      localStorage.setItem('token', response.sessionToken);
      localStorage.setItem('token', response.password);
      if (response.sessionToken) {
        self.props.router.navigate('chat/', {trigger: true});
      };
    });
  },

  handleSignUp: function(userData){
    console.log(userData);
    $.post('https://thefraz.herokuapp.com/users', userData).then(function(response){
      console.log(response);
    });
  },


  render:function(){
    return(
      <TemplateContainer>
        <Login handleSubmit={this.handleSubmit}/>
        <SignUp handleSignUp={this.handleSignUp}/>
      </TemplateContainer>
    );
  }
});


module.exports = {
  LoginContainer: LoginContainer
}
