/**
 * Created by AVALON on 12/12/15.
 */
/**
 * Module dependencies
 */
var mongoose = require('mongoose');


/**
 * UserInfo schema
 */

var blogSchema = new mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  posts: []
});
/**
 * Statics
 */
blogSchema.statics.Create = function (userInfo, callback) {
  // create the Picture
  var Blog = mongoose.model('Blog', blogSchema);
  var newBlog = new Blog({
    username: userInfo.username
  });

  // save the user
  newBlog.save(function (err) {
    // In case of any error, return using the done method
    if (err) {
      return callback(err);
    }
    console.log('saved blog');
    // Picture save successful
    return callback(null, newBlog);
  });
};

/**
 * Register blogSchema
 */
module.exports = mongoose.model('Blog', blogSchema);