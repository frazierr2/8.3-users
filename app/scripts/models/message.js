var Backbone = require('backbone');

var Messages = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var MessagesCollection = Backbone.Collection.extend({
  model: Messages,
  url: 'https://thefraz.herokuapp.com/classes/message',
  parse: function(data){
    // console.log('messages', data.results);
    return data.results;
  }
});


module.exports = {
  Messages: Messages,
  MessagesCollection: MessagesCollection
};
