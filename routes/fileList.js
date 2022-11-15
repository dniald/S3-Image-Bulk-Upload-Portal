// AWS.config.update({ region: process.env.AWS_REGION });
var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION  
});

const router = require('express').Router();

var s3 = new AWS.S3();

// calling listObjects
var Params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  // 'image-upload-nodexpress',
};

// list of the objects in the bucket
router.post('/list', (req, res) => {
  s3.listObjectsV2(Params, function (err, data) {
    if (err) {
      console.log("Error", err);
      res.json({ status: 'Failed' })
    } else {
      console.log("Success", data);
      res.json({ status: 'List of files successfully', data })
    }
  });
});

module.exports = router;