//copy file from folder to other folder

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();

var params = {
  Bucket: 'image-upload-nodexpress/uploads', // Target bucket 
  CopySource: 'image-upload-nodexpress/mbblogo/logo (99).png',  //source yg nak dicopy
  Key: "logo (99).png", //filenameee
};

s3.copyObject(params, function (err, data) {
  if (err)
    console.log(err, err);
  else {
    console.log(data);
    console.log(deleteObj);
  }
});
