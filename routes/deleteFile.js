var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const router = require('express').Router();

var s3 = new AWS.S3();

var Params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: 'mbblogo/logo (101).png'
}

// delete file in the objects(folder) in the bucket
router.post('/delete', (req, res) => {
  s3.deleteObject(Params, function (err, data) {
    if (err) {
      console.log("Error", err);
      res.json({ status: `Failed at: ${Params.Key} `, data })
    } else {
      console.log("Success", data);
      res.json({ status: `File deletion successful at: ${Params.Key} `, data})
    }
  });
});

module.exports = router;
