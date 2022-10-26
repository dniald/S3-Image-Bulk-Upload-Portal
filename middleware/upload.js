const { S3 } = require('aws-sdk')

exports.s3Upload = async(files) => {
    const s3 = new S3();

    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,    //bucket name
            Key: `mbblogo/${file.originalname}`,    //folder path name
            Body: file.buffer                       //fetch body file
        };
    });

    //return params in array instead of one by one
    return await Promise.all(
        params.map((param) => s3.upload(param).promise())
    );
}