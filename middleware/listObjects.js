var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// calling listObjects
var bucketParams = {
  Bucket : 'image-upload-nodexpress',
};

// list of the objects in the bucket
s3.listObjects(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});