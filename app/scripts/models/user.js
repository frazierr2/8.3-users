var Backbone = require('backbone');

var Users = Backbone.Model.extend({

});

var UsersCollection = Backbone.Model.extend({
  model: Users
});

module.exorts = {
  Users: Users,
  UsersCollection: UsersCollection
};
