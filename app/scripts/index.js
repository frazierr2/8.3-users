var $ = require('jquery');
var Backbone = require('backbone');
require('./router');

$(function(){
  Backbone.history.start();
});

// Setting up the Parse Server with Application Key and Rest Key to talk to server
// $.ajaxSetup({
//   beforeSend: function(xhr){
//     xhr.setRequestHeader('X-Parse-Application-Id','ryansparseserver');
//     xhr.setRequestHeader('X-Parse-REST-API-Key','ryansapikey');
//   }
// });
// // Pulling in the Server to the document
// var url = 'https://thefraz.herokuapp.com/';
// var resultPromise = $.ajax(url).then(function(data){
//   console.log(data);
// });
//

// $('#signup').on('submit',function(e){
//   e.preventDefault();
//
// var data = {
//   'username': $('#new-username').val(),
//   'password': $('#new-password').val(),
// };
//
//   $.post('https://tiny-parse-server.herokuapp.com/' + 'users', data).then(function(response){
//     console.log(response);
//   });
// });
//
//
//
// $('#login').on('sumbit',function(e){
//   e.preventDefault();
//
//   var username = $('#signin').val();
//   var password = $('#signin-password').val();
//
//   $.get('https://tiny-parse-server.herokuapp.com/'+ 'login?username=' +  username + '&password=' + password).then(function(response){
//     console.log(response);
//   });
// });
