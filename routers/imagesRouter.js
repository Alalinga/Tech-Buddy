const express = require('express');
const multerUpload = require('../config/multer')
const route = express.Router();
const passport = require('passport');
const User = require('../models/schemas');


passportAuthenticate(passport)

route.post('/upload-images',multerUpload.single(),(req,res,next)=>{

});

route.get('/images',(req,res,next)=>{

})