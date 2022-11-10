const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// AWS.config.setPromisesDependency(require('bluebird'));
// const s3 = new AWS.S3();
const await = require('async');

const asyncForEach = async (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        await callback(array[i], i, array)
    }
}

const awsMove = async ({ files }) => {
    try {
        const s3 = new aws.S3()
        const AWS_BUCKET = process.env.AWS_BUCKET

        await asyncForEach(files, async file => {
            const copyParams = {
                Key: file.newPath,
                ACL: 'public-read',
                Bucket: AWS_BUCKET,
                CopySource: encodeURI(`/${AWS_BUCKET}/${file.oldPath}`)
            }
            await s3.copyObject(copyParams).promise()
            console.log(asyncForEach)

            const deleteParams = {
                Key: file.oldPath,
                Bucket: AWS_BUCKET
            }
            await s3.deleteObject(deleteParams).promise()
            console.log(deleteParams)

        })
    } catch (err) {
        console.log(err)
    }
    await awsMove({ files })
    console.log(awsMove)
}

const files = [
    { oldPath: 'mbblogo/logo (1).png', newPath: 'uploads/' },
    // { oldPath: 'another-folder/file', newPath: 'another-folder-copy/file' }
]

console.log(asyncForEach)
