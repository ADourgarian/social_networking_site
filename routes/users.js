var express = require('express');
var router = express.Router();
var Users = require('../models/users');
/* GET users listing. */

router.get('/:username', function (req, res, next) {
  // replace with mongo data from users collection
  var username = req.params.username;
  Users.findOne({ 'username': username}, function (err, results) {
    res.json(results);
  });
});

module.exports = router;
