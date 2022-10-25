require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { s3Upload } = require('./upload');
const port = 4000;
const app = express();

const storage = multer.memoryStorage();

//file filter
const fileFilter = (req, file, cb) =>{
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error(new Error("Only accept images (.jpg & .png)")));
    }
}

//multiple upload image
 const multiUpload = multer({storage, fileFilter, limits:{fileSize:100000000}})

 app.post('/uploads', multiUpload.array("file"), async (req, res) => {
    const file = req.files[0];
    const result = await s3Upload(file);
    res.json({status: 'successful upload to s3 bucket'})
 })

 app.listen(port, ()=> 
 console.log(`Server is running on port: ${port}`)
 )