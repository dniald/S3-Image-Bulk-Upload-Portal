//copy file from folder to other folder

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const router = require('express').Router();

var s3 = new AWS.S3();

var params = {
  Bucket: 'image-upload-nodexpress/uploads', // Target bucket 
  CopySource: 'image-upload-nodexpress/mbblogo/logo (98).png',  //source yg nak dicopy
  Key: "logo (98).png", //filenameee
};

router.post("/copyfile", (req, res) => {
  s3.copyObject(params, function (err, data) {
    if (err){
      console.log(err);
      res.json({status: 'Failed'})
    }
    else {
      console.log(params.Key,' file has been copy into: ', params.Bucket , data);
      res.json({status: 'File has been copy'})
    }
  });
});

module.exports = router;