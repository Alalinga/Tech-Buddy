const express = require('express');
const route = express.Router();
const passportAuthenticate = require('../authentication/authenticate');
const checkAuthentication = require('../authentication/checkAuthentication')
const passport = require('passport');
const accountsValidator = require('../models/validator');
const { creatAccounts, userLogin } = require('../models/user');
const { uploadImages, getImages, getImageByName, deleteImageByName } = require('../models/images');
const { uploadVideos, deleteVideoByName, getVideos, getVideoByName } = require('../models/videos');
passportAuthenticate(passport)


route.post('/login', passport.authenticate('local', {}), userLogin);

route.delete('/logout', (req, res) => {
    req.logOut()
    return res.json({ message: "Logged Out ", isAuthenticated: req.isAuthenticated() })
});

route.post('/create-accounts', accountsValidator, creatAccounts);


//  Videos routes

route.post('/videos', checkAuthentication, uploadVideos);

route.delete('/videos/:name', checkAuthentication, deleteVideoByName);

route.get('/videos', checkAuthentication, getVideos);

route.get('/videos/:name', checkAuthentication, getVideoByName);




/**Images routes */

// upload  Image(s)

route.post('/images', checkAuthentication, uploadImages)

//  get all Images
route.get('/images', checkAuthentication, getImages);

// get single image by name
route.get('/images/:name', checkAuthentication, getImageByName);

// delete single image by name
route.delete('/images/:name', checkAuthentication, deleteImageByName);

module.exports = route