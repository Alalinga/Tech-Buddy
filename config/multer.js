const multer = require('multer')
const path = require('path')
const imageExt = ['.png', '.jpeg', '.jpg']
const videoExt = ['.mp4', '.mkv', '.ts', '.wmv', '.avi', '.mov']
uploadVideo = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        // get file extention
        let filext = path.extname(file.originalname);
        //  checking if file extention exist in the array of extentions declared above
        if (videoExt.includes(filext.toLocaleLowerCase())) {
            return cb(null, true)
        }
        else {
            return cb(new Error("File type not supported! Must be a video type"), false)
        }
    }
});
uploadImage = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        // get file extention
        let filext = path.extname(file.originalname);
        //  checking if file extention exist in the array of extentions declared above
        if (imageExt.includes(filext.toLocaleLowerCase())) {
            return cb(null, true)
        }
        else {
            return cb(new Error("File type not supported! Must be an image type"), false)
        }
    }
});

module.exports = {uploadImage,uploadVideo}