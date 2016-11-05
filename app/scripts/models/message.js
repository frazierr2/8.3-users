var Backbone = require('backbone');

var Messages = Backbone.Model.extend({
  idAttribute: '_id'
});

var MessagesCollection = Backbone.Model.extend({
  model: Messages
  url: 'https://thefraz.herokuapp.com/classes/Message'
});

module.exorts = {
  Messages: Messages,
  MessagesCollection: MessagesCollection
};
