var React = require('react');

var TemplateContainer = React.createClass({
  render: function(){
    return(
      <div className="container">
        <div className="row">

          {this.props.children}


      </div>
    </div>
    )
  }
});

module.exports = {
  TemplateContainer: TemplateContainer
}
