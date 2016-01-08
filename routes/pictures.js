var express = require('express');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer();
var router = express.Router();
var streamifier = require('streamifier');
var cloudinaryData = require('../models/cloudinaryData');
var users = require('../models/users');
var userInfo = require('../models/userInfo');

/* GET home page. */
router.post('/profile/:username', upload.single('file'), function (req, res, next) {
  console.log(req.file);
  var stream = cloudinary.uploader.upload_stream(function (result) {
    console.log(result);

    cloudinaryData.Create(result, function (err, results) {
      userInfo.update({username:req.params.username},{profilePic_id: results.public_id},function (err, results) {
        res.json(results);
      });
    });

  });

  streamifier.createReadStream(req.file.buffer).pipe(stream);
});

module.exports = router;
