const multer = require('multer')
const path = require('path')
const imageExt = ['.png', '.jpeg', '.jpg']
const videoExt = ['.mp4', '.mkv', '.ts', '.wmv', '.avi', '.mov']
upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        // get file extention
        let filext = path.extname(file.originalname);
        //  checking if file extention exist in the array of extentions declared above
        if (videoExt.includes(filext.toLocaleLowerCase()) || imageExt.includes(filext.toLocaleLowerCase())) {
            return cb(null, true)
        }
        else {
            return cb(new Error("File type not supported"), false)
        }
    }
});

module.exports = upload