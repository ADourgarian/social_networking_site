/**
 * Created by AVALON on 12/12/15.
 */

var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var userInfo = require('../models/userInfo');
var blog = require('../models/blog');

/* POST /api/register/ */
router.post('/', function (req, res, next) {
  req.check('username').isAlphanumeric(); // check to see if not empty

  var errors = req.validationErrors();

  if (errors){
    res.status(400).send(errors);
  } else {
    Users.Create(req.body, function (err, user) {
      if (err) {
        res.status(400).send(err.message);
      } else {

        blog.Create({username:user.username}, function(err, blog){});
        // create userInfo for this user
        user.city='';
        user.profilePic_id='';
        user.coverPhoto='';
        user.aboutMe='';
        user.following=user.username;
        userInfo.Create(user, function (err, userInfo) {
          console.log(user);
          if (err) {
            res.status(400).send(err.message);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  }
});

module.exports = router;