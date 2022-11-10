const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
const sourceS3 = new AWS.S3();
const destinationS3 = new AWS.S3();

const sourceParams = {
  Bucket: 'image-upload-nodexpress/mbblogo',
  Key: 'mbblogo/'
};

const destinationParams = {
  Bucket: 'image-upload-nodexpress/uploads',
  Key: 'uploads/'
};

const objectStream = sourceS3.getObject(sourceParams).createReadStream();
const upload = destinationS3.upload({ ...destinationParams, Body: objectStream });

upload.on('httpUploadProgress', progress => {
  console.log(progress);
});

upload
  .promise()
  .then(() => {
    console.log('success');
  })
  .catch(err => {
    console.error(err);
})