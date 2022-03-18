const express = require('express');
const upload = require('../config/multer')
const route = express.Router();
const bcypt = require('bcrypt');
const passportAuthenticate = require('../authentication/authenticate');
const checkAuthentication = require('../authentication/checkAuthentication')
const passport = require('passport');
const User = require('../models/schemas');
const { uploadFile, uploadBigFile, deleteImage, deleteVideo } = require('../models/operations.js');


passportAuthenticate(passport)
route.post('/login', passport.authenticate('local', {}), (req, res) => {
    if (!req.isAuthenticated) return res.json(req.authInfo)
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
route.post('/upload-videos', checkAuthentication, upload.array("video"), async (req, res, next) => {
    try {
        if (req.files) {

            const results = [];
            let numberOfVideos = 0
            for (video of req.files) {
                numberOfVideos++
                if (parseInt(video.size) <= 100000000) {

                    const options = { resource_type: "video", folder: `techBuddy/${req.user.username}/videos/` }
                    const response = await uploadFile(video.path, options, req.user._id)
                    results.push(response)
                    //return res.json({ response: response })
                } else {

                    const options = { resource_type: "video", chunk_size: 6000000, folder: `techBuddy/${req.user.username}/videos/` }
                    const response = uploadBigFile(video.path, options, req.user._id)
                    results.push(response)
                }

            }
            return res.json({ response: results.flat(), message: "Successfully uploaded " + numberOfVideos + " video(s)" })
        }

    } catch (e) {
        return res.json(e)
    }
});

route.delete('/delete-video/:id', checkAuthentication, async (req, res) => {
    console.log(req.params.id)
    if (req.params.id) {
        const results = await deleteVideo(req.params.id, req.user.id)
        return res.json(results)
    }
})


// Images routes


// upload Single Image
route.post('/upload-image', checkAuthentication, upload.array('image'), async (req, res) => {
    try {
        if (req.files) {
            let results = [];
            let numberOfImages = 0
            for (file of req.files) {
                numberOfImages++
                const response = await uploadFile(file.path, { folder: `techBuddy/${req.user.username}/images/` }, req.user._id)
                results.push(response)
            }

            return res.json({ response: results.flat(), message: "Successfully uploaded " + numberOfImages + " image(s)" })
        }
    } catch (e) {
        return res.json(e)
    }
})


// get single inage
route.get('/images/:id', (req, res, next) => {
    try {
        // const response = await cloudinary.upload.upload(req.file.path)
        res.json(req.file)

    } catch (e) {
        res.json(e)
    }
})

//  get all Images
route.get('/images', (req, res, next) => {
    try {
        // const response = await cloudinary.upload.upload(req.file.path)
        res.json(req.file)

    } catch (e) {
        res.json(e)
    }
})
route.delete('/delete-image/:id', checkAuthentication, async (req, res) => {
    console.log(req.params.id)
    if (req.params.id) {
        const results = await deleteImage(req.params.id, req.user.id)
        return res.json(results)
    }
})

module.exports = route