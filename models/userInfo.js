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

var userInfoSchema = new mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  instrumentsPlayed: [],
  genresPlayed: [],
  city: String,
  profilePic_id:String,
  coverPhoto: String,
  following: Array,
  followers: [],
  aboutMe: String
});
/**
 * Statics
 */
userInfoSchema.statics.Create = function (userInfo, callback) {
  // create the Picture
  var UserInfo = mongoose.model('UserInfo', userInfoSchema);
  var newUserInfo = new UserInfo({
    username: userInfo.username,
    city: userInfo.city,
    profilePic_id:userInfo.profilePic_id,
    coverPhoto: userInfo.coverPhoto,
    following: userInfo.following
  });

  // save the user
  newUserInfo.save(function (err) {
    // In case of any error, return using the done method
    if (err) {
      return callback(err);
    }
    console.log('saved userInfo');
    // Picture save successful
    return callback(null, newUserInfo);
  });
};

/**
 * Register userInfoSchema
 */
module.exports = mongoose.model('UserInfo', userInfoSchema);