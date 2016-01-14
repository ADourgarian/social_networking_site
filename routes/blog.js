var express = require('express');
var router = express.Router();
var blog = require('../models/blog');
var userInfo = require('../models/users');

router.put('/comment', function (req, res, next) {
  console.log('THIS IS THE REQUEST.BODY', req.body);
  //blog.findOne({username: req.body.postOwner}, function (err, myBlog) {
  //  console.log('BLOG: ', myBlog);
  //  for (var i in myBlog.posts) {
  //    if (myBlog.posts[i].post_id === req.body.post_id) {
  //      myBlog.posts[i].comments.push(req.body);
  //      blog.update({username: req.body.postOwner}, {posts: myBlog.posts}, function (err, newBlog) {
  //        res.send(200);
  //      })
  //    }
  //  }
  //});
});

router.post('/:username', function (req, res, next) {

  blog.update({username:req.params.username},{posts:req.body},function(err, blog){
    console.log(blog);
    res.send(200);
  });
});




  //blog.findByIdAndUpdate(
  //  req.body._id,
  //  {$push: {"messages": {title: title, msg: msg}}},
  //  {safe: true, upsert: true, new : true},
  //  function(err, model) {
  //    console.log(err);
  //  }
  //);



router.get('/:username', function (req, res, next){
  blog.findOne({username:req.params.username},function(err, myBlog){
    if(myBlog) {
      res.send(myBlog);
    } else {
      blog.Create({username:req.params.username},function(err,blog){
        res.send(blog);
      })
    }
  })
});

module.exports = router;