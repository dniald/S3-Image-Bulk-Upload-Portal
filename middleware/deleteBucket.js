var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// params for S3.deleteBucket
var bucketParams = {
  Bucket : 'danialdddddd'
};

//  delete the bucket
s3.deleteBucket(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
