var Backbone = require('backbone');

var Users = Backbone.Model.extend({
 idAttribute: 'objectId'
});

var UsersCollection = Backbone.Collection.extend({
  model: Users,
  url: 'https://thefraz.herokuapp.com/classes/User'
});

module.exorts = {
  Users: Users,
  UsersCollection: UsersCollection
};
