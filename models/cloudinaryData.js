/**
 * Created by AVALON on 12/12/15.
 */
/**
 * Module dependencies
 */
var mongoose = require('mongoose');


/**
 * User schema
 */

var pictureSchema = new mongoose.Schema({
  public_id: {type: String, required: true},
  version: {type: Number},
  signature: {type: String},
  width: {type: Number, required: true},
  height: {type: Number, required: true},
  format: {type: String, required: true},
  resource_type: {type: String, required: true},
  created_at: {type: String},
  tags: {type: Array},
  bytes: {type: Number, required: true},
  type: {type: String},
  etag: {type: String},
  url: {type: String},
  secure_url: {type: String},
  original_filename: {type: String}
});
/**
 * Statics
 */
pictureSchema.statics.Create = function (picture, callback) {
  // create the Picture
  var Picture = mongoose.model('Picture', pictureSchema);
  var newPicture = new Picture({
    public_id: picture.public_id,
    version: picture.version,
    signature: picture.signature,
    width: picture.width,
    height: picture.height,
    format: picture.format,
    resource_type: picture.resource_type,
    created_at: picture.created_at,
    tags: picture.tags,
    bytes: picture.bytes,
    type: picture.type,
    etag: picture.etag,
    url: picture.url,
    secure_url: picture.secure_url,
    original_filename: picture.original_filename
  });

  // save the user
  newPicture.save(function (err) {
    // In case of any error, return using the done method
    if (err) {
      return callback(err);
    }
    // Picture save successful
    return callback(null, newPicture);
  });
  console.log('saved Picture');
};

/**
 * Register PictureSchema
 */
module.exports = mongoose.model('Picture', pictureSchema);