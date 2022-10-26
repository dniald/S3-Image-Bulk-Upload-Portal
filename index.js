require('dotenv').config();
const express = require('express');
const multer = require('multer');
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

//multiple upload image (max size 10mb & file limits upload:120)
const multiUpload = multer({ storage, fileFilter, limits: { fileSize: 1000000000, files: 120 } })

app.post('/uploads', multiUpload.array("file"), async (req, res) => {
    try {
        const result = await s3Upload(req.files);
        console.log(result);
        res.json({ status: 'successful upload to s3 bucket',result })
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () =>
    console.log(`Server is running on port: ${port}`)
)