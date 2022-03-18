const express = require('express');
const upload = require('../config/multer')
const route = express.Router();
const bcypt = require('bcrypt');
const passportAuthenticate = require('../authentication/authenticate');
const checkAuthentication = require('../authentication/checkAuthentication')
const passport = require('passport');
const User = require('../models/schemas');
const { uploadFile, uploadBigFile, deleteImage, deleteVideo, getAllVideos, getSingleVideo, getAllImages, getSingleImage } = require('../models/operations.js');



passportAuthenticate(passport)
route.post('/login', passport.authenticate('local', {}), (req, res) => {
    if (!req.isAuthenticated) return res.json(req.authInfo)
    return res.json({ user: req.user.name, isAuthenticated: req.isAuthenticated() })
});

route.delete('/logout',(req, res)=>{
    req.logOut()
    return res.json({message:"Logged Out ",isAuthenticated:req.isAuthenticated()})
})
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
      return res.json({error: e})
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

route.delete('/delete-video/:name', checkAuthentication, async (req, res) => {
    try{
    if (req.params.name) {
        const results = await deleteVideo(req.params.name, req.user._id)
        return res.json(results)
    }
    return res.json({error: "Video name is required in the parameter!"})
}catch(e){
    return res.json({error:" error occured "+ e})
}
})

route.get('/videos',checkAuthentication, async (req,res)=>{
    try{
       const response = await getAllVideos(req.user._id)
       return res.json({response:response})

    }catch(e){
        return res.json({error:e})
    }

});
route.get('/videos/:name',checkAuthentication, async (req,res)=>{
    try{
        if(req.params.name){
        const response =  await getSingleVideo(req.user._id,req.params.name)
        return res.json({response: response})
        }
        return res.json({error: "Video name is required in the parameter"})
    }catch(e){
        return res.json({error: e})
    }
    
});




/**Images routes */ 

// upload  Image(s)
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

//  get all Images
route.get('/images',checkAuthentication, async (req,res)=>{
    try{
       const response = await getAllImages(req.user._id)
       return res.json({response:response})

    }catch(e){
        return res.json({error:e})
    }

});

// get single image by name
route.get('/images/:name',checkAuthentication, async (req,res)=>{
    try{
        if(req.params.name){
        const response =  await getSingleImage(req.user._id,req.params.name)
        return res.json({response: response})
        }
        return res.json({error:"Image name is require in the parameter"})
    }catch(e){
        return res.json({error: e})
    }
    
});

// delete single image by name
route.delete('/delete-image/:name', checkAuthentication, async (req, res) => {
    try{
    if (req.params.name) {
        const results = await deleteImage(req.params.name, req.user._id)
        return res.json(results)
    }
    return res.json({error:"Image name is required in the parameter "})
}catch(e){
    return res.json({error:e})
}
})

module.exports = route