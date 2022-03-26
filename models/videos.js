const { uploadFile, uploadBigFile,  deleteVideo, getAllVideos, getSingleVideo } = require('../models/operations.js');
const { uploadVideo } = require('../config/multer')


const videoUpload = uploadVideo.array("video");
const uploadVideos = (req, res) => {
    videoUpload(req, res, async (err) => {

        if (err) return res.status(400).json(err.message)
        try {
            if (req.files) {

                let results = [];
                let error = [];
                let failureCounter = 0
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
                if (error.length > 0) return res.status(201).json({ response: results.flat(), success: "Successfully uploaded " + numberOfVideos + " video(s)", failed: failureCounter + "video(s) failed to upload", error: error })

                return res.status(201).json({ response: results.flat(), message: "Successfully uploaded " + numberOfVideos + " video(s)" })
            }

        } catch (e) {
            console.log('executed')
            return res.status(400).json(e)
        }
    })
}
const getVideos = async (req, res) => {
    try {
        const response = await getAllVideos(req.user._id)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(400).json({ error: e })
    }

}

const getVideoByName = async (req, res) => {
    try {
        if (req.params.name) {
            const response = await getSingleVideo(req.user._id, req.params.name)
            if (response.notFound) return res.status(404).json("not found")
            return res.status(200).json(response)
        }
        return res.status(406).json({ error: "Video name is required in the parameter" })
    } catch (e) {
        return res.status(400).json({ error: e + "Bad request" })
    }

}

const deleteVideoByName = async (req, res) => {
    try {
        if (req.params.name) {
            const results = await deleteVideo(req.params.name, req.user._id)
            if (results.notFound) return res.status(404).json(results);
            return res.status(200).json(results)
        }
        return res.status(406).json({ error: "Video name is required in the parameter!" })
    } catch (e) {
        return res.status(400).json({ error: " error occured " + e })
    }
}


module.exports = {uploadVideos,getVideos,getVideoByName,deleteVideoByName}

