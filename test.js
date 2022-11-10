const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// AWS.config.setPromisesDependency(require('bluebird'));
const s3 = new AWS.S3();
const await = require('async');
const { default: async } = require('async');

const bucketName = 'image-upload-nodexpress';        // example bucket
const folderToMove = 'mbblogo/';   // old folder name
const destinationFolder = 'uploads/'; // new destination folder 

const  moveFiles = async() =>{
try {
    const listObjectsResponse = await s3.listObjects({
        Bucket: bucketName,
        Prefix: folderToMove,
        Delimiter: '/',
    }).promise();

    const folderContentInfo = listObjectsResponse.Contents;
    const folderPrefix = listObjectsResponse.Prefix;

    await Promise.all(
      folderContentInfo.map(async (fileInfo) => {
        await s3.copyObject({
          Bucket: bucketName,
          CopySource: `${bucketName}/${fileInfo.Key}`,  // old file Key
          Key: `${destinationFolder}/${fileInfo.Key.replace(folderPrefix, '')}`, // new file Key
        }).promise();

        await s3.deleteObject({
            Bucket: bucketName,
            Key: fileInfo.Key,
          }).promise();
        })
      );
  } catch (err) {
    console.error(err); // error handling
  }
}
console.log(moveFiles)
// await moveFiles();