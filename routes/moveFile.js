//Move File from folder to another folder (copy and delete files from previous folder)

const router = require('express').Router();

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();

var params = {
  Bucket: 'image-upload-nodexpress/uploads', // Target bucket 
  CopySource: 'image-upload-nodexpress/mbblogo/logo (98).png',  //source yg nak dicopy
  Key: "logo (98).png", //filenameee
};

router.post("/movefile", (req, res) => {
s3.copyObject(params, function (err, data) {
  deleteObj();
  if (err) {
    console.log(err);
    res.json({status: 'Moving file failed'})
  }
  else {
    res.json({status: 'File has been moved'})
    console.log(data);
    console.log(deleteObj);
  }
});
});

 function deleteObj() {
  // delete params.CopySource; // only fetch bucket & key from params
  var params = {
    Bucket: "image-upload-nodexpress/mbblogo", 
    Key: "logo (99).png"
   };

  s3.deleteObject(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
};

module.exports = router;