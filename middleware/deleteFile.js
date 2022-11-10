// const { S3 } = require('aws-sdk')
// const s3 = new S3();
var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// function deleteS3Object(username, filename, bucket, res){
s3.deleteObject({
    Bucket: 'image-upload-nodexpress',
    Key: 'logo (10)'
}, (err, data) => {
    // console.log(err);
    // console.log(data);
})
//}

// read/download file from s3 bucket
// exports.s3download = function (params) {
//     return new Promise((resolve, reject) => {
//         s3.createBucket({
//             Bucket: process.env.AWS_BUCKET_NAME       
//         }, function () {
//             s3.getObject(params, function (err, data) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     console.log("Successfully dowloaded data from  bucket");
//                     resolve(data);
//                 }
//             });
//         });
//     });
// }

// exports.s3delete = function (params) {
//     return new Promise((resolve, reject) => {
//         s3.createBucket({
//             Bucket: process.env.AWS_BUCKET_NAME,        /* Put bucket name */
//             Key: 'test.jpg'
//         }, function () {
//             s3.deleteObject(params, function (err, data) {
//                 if (err) console.log(err);
//                 else
//                     console.log(
//                         "Successfully deleted file from bucket"
//                     );
//                 console.log(data);
//             });
//         });
//     });
// };