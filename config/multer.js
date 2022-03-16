const multer = require('multer')
const path = require('path')
const imageExt = ['.png','.jpeg','.jpg']
const videoExt = ['.mp4','.mkv','.ts','.wmv','.avi','.mov']
upload = multer({
storage: multer.diskStorage({}),
fileFilter: (req,file,cb)=>{
    // get file extention
    console.log("I am working")
  let filext = path.extname(file.originalname);
   if(videoExt.includes(filext) || imageExt.includes(filext)){
       return cb(null,true)
   }
   else{
       return cb(new Error("File type not supported"),false)
   }
}
});

module.exports = upload