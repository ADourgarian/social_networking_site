var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var userInfo = require('../models/userInfo')

router.get('/:query', function(req,res, next){
  var query = req.params.query;
  var fullName = query.split(' ');
  console.log(fullName);
  Users.find( {$or:[{username: query}, {firstName: query}, {lastName: query}]}, function(err,results){
    var usersFound = [];
    for (i in results){
      var user = {};
      user.firstName = results[i].firstName;
      user.lastName = results[i].lastName;
      user.username = results[i].username;
      usersFound.push(user);
    }
    res.send(usersFound);
  });
});

module.exports = router;