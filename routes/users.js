var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var userInfo = require('../models/userInfo');
var cloudinaryData = require('../models/cloudinaryData');
/* GET users listing. */

router.get('/:username', function (req, res, next) {
  // replace with mongo data from users collection
  var username = req.params.username;
  var userData = {};
  Users.findOne({ 'username': username}, function (err, results) {
    userData.username = results.username;
    userData.firstName = results.firstName;
    userData.lastName = results.lastName;
    userInfo.findOne({ 'username': userData.username}, function (err, results) {
      userData.editable = results;
      if (userData.editable.profilePic_id) {
        cloudinaryData.findOne({public_id: results.profilePic_id}, function (err, results) {
          if (results) {
            userData.profilePic = results.url;
            res.send(userData);
          } else {
            res.send(userData);
          }
        });
      } else {
        res.send(userData);
      }
    });
  });
});

// update userInfo
router.put('/:username', function (req, res, next) {
  // add additional info to user
  var username = req.params.username;
  //console.log('username',username);
  //console.log('req.body',req.body);
  var info = req.body.editable;
  console.log('userInfo',userInfo);
  userInfo.update({'username':username}, info, function (err, results) {
    console.log(results);
    res.json(results);
  });
});
module.exports = router;
