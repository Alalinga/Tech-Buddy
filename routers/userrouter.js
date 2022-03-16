const express = require('express');
const upload = require('../config/multer')
const route = express.Router();
const bcypt = require('bcrypt');
const cloudinary = require('../config/cloudinary')
const passportAuthenticate = require('../authentication/authenticate');
const checkAuthentication = require('../authentication/checkAuthentication')
const passport = require('passport');
const User = require('../models/schemas');
const multer = require('multer')
const uploadFileTo = multer({ dest: process.cwd() + '/public/images' })
const uploader = multer({})


passportAuthenticate(passport)
route.post('/login', passport.authenticate('local', {}), (req, res) => {
    return res.json({ user: req.user, isAuthenticated: req.isAuthenticated() })
});

route.post('/create-accounts', async (req, res) => {
    const encryptedPassword = await bcypt.hash(req.body.password, 10)
    try {
        const createUser = User({
            username: req.body.username,
            password: encryptedPassword,
            email: req.body.email
        });
        createUser.save((err, data) => {
            if (err) return console.log("Error occured => " + err)
            return res.json({ user: data.username })
        });
    } catch (e) {
        res.send(e)
    }
});


//  Videos routes
route.post('/upload-videos',upload.single("video"), (req, res, next) => {
    try {
        // const response = await cloudinary.upload.upload(req.file.path)

        res.json(req.file)

    } catch (e) {
        res.json(e)
    }
});

route.get('/vedios', async (req, res, next) => {

})


// Images routes
route.post('/upload-images',checkAuthentication,uploader.array('image'),  (req, res) => {
    
       if(req.files){
        // const response = await cloudinary.uploader.upload(req.file.path,{
        //     folder:`techBuddy/${req.user}/`
        // })
        res.json("ok I resive somth => "+ req.files)
       
       }else{
           res.json("something went wrong"+ req.files)
       }
});

route.get('/images', (req, res, next) => {
    try {
        // const response = await cloudinary.upload.upload(req.file.path)
        res.json(req.file)

    } catch (e) {
        res.json(e)
    }
})

module.exports = route