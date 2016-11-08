var Backbone = require('backbone');

var Messages = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var MessagesCollection = Backbone.Collection.extend({
  model: Messages,
  url: 'https://thefraz.herokuapp.com/classes/Message'

});


module.exorts = {
  Messages: Messages,
  MessagesCollection: MessagesCollection
};
