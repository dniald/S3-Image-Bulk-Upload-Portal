var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: process.env.AWS_REGION});


s3 = new AWS.S3({apiVersion: '2006-03-01'});

//list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});
