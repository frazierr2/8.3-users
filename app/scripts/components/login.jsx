var React = require('react');
var Backbone = require('backbone');

var TemplateContainer = require('./template.jsx').TemplateContainer;


var Login = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
    };
  },
  setUsername: function(e){
    var username = e.target.value;
    this.setState({username: username});
    console.log(username);
    localStorage.setItem('username', JSON.stringify(username));
  },
  setPassword: function(e){
    var password = e.target.value;
    this.setState({password: password});
    console.log(password);
    localStorage.setItem('password', JSON.stringify(password));
  },

  setUserAccount: function(e, userInformation){
    e.preventDefault();
    var router = this.props.router;
    router.navigate('chat/',{trigger: true});

    userInformation = {
      username: this.state.username,
      password: this.state.password
    };
  },
    render: function(){
      return (
          <div onSubmit={this.setUserAccount} className="col-md-6">
            <h1>Please login</h1>
            <form id="login">
              <div className="form-group">
                <label htmlFor="signin">Username</label>
                <input onChange={this.setUsername} value={this.state.username} type="text" className="form-control" id="signin" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="signin-password">Password</label>
                <input onChange={this.setPassword} value={this.state.password} type="password" className="form-control" id="signin-password" placeholder="Password" />
              </div>
              <a href="#chat/" className="login-btn btn btn-primary btn-lg btn-block">Sign In</a>
            </form>
          </div>
      );
    }
});


var SignUp = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
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

  setUserAccount: function(e, userInformation){
    e.preventDefault();

    userInformation = {
      username: this.state.username,
      password: this.state.password
    };
  },
    render: function(){
      return (
          <div onSubmit={this.setUserAccount} className="col-md-6">
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
  getInitialState: function(){
    return {
      username: ''
    };
  },
  setLogin: function(savedLogin){
    this.setState({username: savedLogin});
  },

  render:function(){
    return(
      <TemplateContainer>
        <Login setLogin={this.state.setLogin}/>
        <SignUp />
      </TemplateContainer>
    );
  }
});


module.exports = {
  LoginContainer: LoginContainer
}
