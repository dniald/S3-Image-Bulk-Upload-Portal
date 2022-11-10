//copy file from folder to other folder

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();
var bucketName = 'image-upload-nodexpress';
var params = {
  Bucket: bucketName, // Target bucket 
  CopySource: '/'+bucketName+'/mbblogo/',  //source yg nak dicopy
  Key: '/mbblogo', //filenameee
};

s3.copyObject(params, function (err, data) {
  if (err)
    console.log(err, err);
  else {
    console.log(data);
  }
});
