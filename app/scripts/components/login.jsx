var React = require('react');
var Backbone = require('backbone');

var TemplateContainer = require('./template.jsx').TemplateContainer;


var Login = React.createClass({
    render: function(){
      return (
          <div className="col-md-6">
            <h1>Please login</h1>
            <form id="login">
              <div className="form-group">
                <label htmlFor="signin">Username</label>
                <input type="text" className="form-control" id="signin" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="signin-password">Password</label>
                <input type="password" className="form-control" id="signin-password" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">Sign In</button>
            </form>
          </div>
      );
    }
});


var SignUp = React.createClass({
    render: function(){
      return (

          <div className="col-md-6">
            <h1>No Account? Please sign up</h1>
            <form id="signup">
              <div className="form-group">
                <label htmlFor="new-username">Username</label>
                <input type="text" className="form-control" id="new-username" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">Password</label>
                <input type="password" className="form-control" id="new-password" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">Create An Account</button>
            </form>
          </div>


      );
    }
});

var LoginContainer = React.createClass({
  render:function(){
    return(
      <TemplateContainer>
        <Login />
        <SignUp />
      </TemplateContainer>
    );
  }
});


module.exports = {
  LoginContainer: LoginContainer
}
