var express = require('express');
var router = express.Router();
var Users = require('../models/users');
/* GET users listing. */

router.get('/:username', function (req, res, next) {
  // replace with mongo data from users collection
  var username = req.params.username;
  Users.findOne({ 'username': username}, function (err, results) {
    res.send({username: results.username, firstName: results.firstName, lastName: results.lastName});
  });
});

router.put('/:username', function (req, res, next) {
  // add additional info to user
  var username = req.params.username;
  console.log('username',username);
  console.log('req.body',req.body);
  Users.update({'username':username}, {'$set' : {'editable':req.body}}, function (err, results) {
    console.log(results);
    res.json(results);
  });
});
module.exports = router;
