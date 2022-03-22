const express = require('express');
const upload = require('../config/multer')
const route = express.Router();
const bcypt = require('bcrypt');
const passportAuthenticate = require('../authentication/authenticate');
const checkAuthentication = require('../authentication/checkAuthentication')
const passport = require('passport');
const User = require('../models/schemas');
const { uploadFile, uploadBigFile, deleteImage, deleteVideo, getAllVideos, getSingleVideo, getAllImages, getSingleImage } = require('../models/operations.js');
// const fs = require('fs')
passportAuthenticate(passport)


//console.log(fs.readFileSync(`${__dirname}/images/im1.png`))


route.post('/login', passport.authenticate('local', {}), (req, res) => {
    // if (!req.isAuthenticated) return res.json(req.authInfo)
    return res.status(200).json({ user: req.user.name, isAuthenticated: req.isAuthenticated() })
});



route.delete('/logout', (req, res) => {
    req.logOut()
    return res.json({ message: "Logged Out ", isAuthenticated: req.isAuthenticated() })
});


route.post('/create-accounts', (req, res) => {
  
    bcypt.hash(req.body.password, 10).then((result) => {
        const createUser = User({
            username: req.body.username,
            password: result,
            email: req.body.email
        });
        createUser.save((err, data) => {
            if (err) return res.status(400).json({ error: err })
            return res.status(201).json({ user: data.username })
        });
    }).catch((error) => {
        return res.status(400).json({ error: "error occored " + error })
    })
    // try {
    //     const createUser = User({
    //         username: req.body.username,
    //         password: encryptedPassword,
    //         email: req.body.email
    //     });
    //     createUser.save((err, data) => {
    //         if (err) return res.status(500).json({ error: err}) 
    //         return res.status(201).json({ user: data.username})
    //     });
    // } catch (e) {
    //   return res.status(400).json({error: e})
    // }
});


//  Videos routes
route.post('/videos', checkAuthentication, upload.array("video"), async (req, res, next) => {
    try {
        if (req.files) {

            const results = [];
            let numberOfVideos = 0
            for (video of req.files) {
                numberOfVideos++
                if (parseInt(video.size) <= 100000000) {

                    const options = { resource_type: "video", folder: `techBuddy/${req.user.username}/videos/` }
                    const response = await uploadFile(video.path, options, req.user._id, req.body.description)
                    results.push(response)
                    //return res.json({ response: response })
                } else {

                    const options = { resource_type: "video", chunk_size: 6000000, folder: `techBuddy/${req.user.username}/videos/` }
                    const response = uploadBigFile(video.path, options, req.user._id, req.body.description)
                    results.push(response)
                }

            }
            return res.json({ response: results.flat(), message: "Successfully uploaded " + numberOfVideos + " video(s)" })
        }

    } catch (e) {
        return res.json(e)
    }
});

route.delete('/videos/:name', checkAuthentication, async (req, res) => {
    try {
        if (req.params.name) {
            const results = await deleteVideo(req.params.name, req.user._id)
            if (results.notFound) return res.status(404).json(results);

            return res.status(200).json(results)
        }
        return res.json({ error: "Video name is required in the parameter!" })
    } catch (e) {
        return res.json({ error: " error occured " + e })
    }
});

route.get('/videos', checkAuthentication, async (req, res) => {
    try {
        const response = await getAllVideos(req.user._id)
        return res.json({ response: response })

    } catch (e) {
        return res.json({ error: e })
    }

});
route.get('/videos/:name', checkAuthentication, async (req, res) => {
    try {
        if (req.params.name) {
            const response = await getSingleVideo(req.user._id, req.params.name)
            if (response.length === 0) return res.status(404).send("not found")
            return res.json({ response: response })
        }
        return res.json({ error: "Video name is required in the parameter" })
    } catch (e) {
        return res.json({ error: e })
    }

});




/**Images routes */

// upload  Image(s)
route.post('/images', checkAuthentication, upload.array('image'), async (req, res) => {
    try {
        if (req.files) {
            let results = [];
            let numberOfImages = 0
            for (file of req.files) {
                numberOfImages++
                const response = await uploadFile(file.path, { folder: `techBuddy/${req.user.username}/images/` }, req.user._id, req.body.description)
                results.push(response)
            }

            return res.json({ response: results.flat(), message: "Successfully uploaded " + numberOfImages + " image(s)" })
        }
    } catch (e) {
        return res.json(e)
    }
})

//  get all Images
route.get('/images', checkAuthentication, async (req, res) => {
    try {
        const response = await getAllImages(req.user._id)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({ error: e })
    }

});

// get single image by name
route.get('/images/:name', checkAuthentication, async (req, res) => {
    try {
        if (req.params.name) {
            const response = await getSingleImage(req.user._id, req.params.name)
            if (response.length === 0) return res.status(404).send("not found")
            return res.status(200).json(response)
        }
        return res.json({ error: "Image name is require in the parameter" })
    } catch (e) {
        return res.json({ error: "error occured " + e })
    }

});

// delete single image by name
route.delete('/images/:name', checkAuthentication, async (req, res) => {
    try {
        if (req.params.name) {
            const results = await deleteImage(req.params.name, req.user._id)
            if (results.notFound) return res.status(404).json(results);
            return res.json(results)
        }
        return res.json({ error: "Image name is required in the parameter " })
    } catch (e) {
        return res.json({ error: e })
    }
});

module.exports = route