require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { s3download, s3delete } = require('./middleware/deleteFIle');
require('./middleware/deleteFIle');
const { s3Upload } = require('./middleware/upload');
const port = 4000;
const app = express();

//use memoryStorage instead of diskStorage (direct to S3 upload from memoryStorage)
const storage = multer.memoryStorage();

//file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error(new Error("Only accept images (.jpg & .png)")));
    }
}

//multiple upload image (max size 10mb & file limits upload:200)
const multiUpload = multer({ storage, fileFilter, limits: { fileSize: 1000000000, files: 200 } })

app.post('/uploads', multiUpload.array("file"), async (req, res) => {
    try {
        const result = await s3Upload(req.files);
        console.log(result);
        res.json({ status: 'successful upload to s3 bucket',result })
    } catch (error) {
        console.log(error)
    }
})

app.post('/api/delete', async (req, res) => {
    try {
        const result = await s3delete(req.files);
        // console.log(result)
        res.json({status: 'file has been delete', result})
    } catch (error) {
        console.log('error  dr index file',error)
    }
})

app.get('api/get/image', async (req, res) => {
    const download = await s3download(res.files)
    console.log(download)
});

const copyFile = require('./routes/copyFile');
const moveFile = require('./routes/moveFile');
const fileList = require('./routes/fileList');

app.use("/api/v1", copyFile);
app.use("/api/v1", moveFile);
app.get("api/v1", fileList);

// app.use("/api/v1", copyFile, async (req, res) => {
//     try {
//         const result = copyFile(req.files);
//         console.log(result)
//         res.json({status: 'file has been copy', result})
//     } catch (error) {
//         console.log('Error copy files',error)
//     }
// })

app.listen(port, () =>
    console.log(`Server is running on port: ${port}`)
)