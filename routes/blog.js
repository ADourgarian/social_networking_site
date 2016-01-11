var express = require('express');
var router = express.Router();
var blog = require('../models/blog');

router.post('/:username', function (req, res, next) {
  blog.update({username:req.params.username},{posts:req.body},function(err, blog){
    console.log(blog);
    res.send(200);
  });
});

router.get('/:username', function (req, res, next){
  blog.findOne({username:req.params.username},function(err, blog){
    res.send(blog);
  })
});

module.exports = router;