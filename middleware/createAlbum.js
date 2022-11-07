var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket : 'danialdddddd'

};

// to create the bucket
s3.createBucket(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);
  }
});
