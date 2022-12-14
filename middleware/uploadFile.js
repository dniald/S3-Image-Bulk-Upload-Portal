var AWS = require('aws-sdk');
AWS.config.update({region: 'REGION'});

var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// to retrieve upload file to specified bucket
var uploadParams = {Bucket: process.env.AWS_BUCKET_NAME, Key: '', Body: ''};
var file = process.argv[3];

// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});

uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
