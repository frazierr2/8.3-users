var Backbone = require('backbone');

var Messages = Backbone.Model.extend({

});

var MessagesCollection = Backbone.Model.extend({
  model: Messages
});

module.exorts = {
  Messages: Messages,
  MessagesCollection: MessagesCollection
};
