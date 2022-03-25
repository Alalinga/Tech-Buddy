const { uploadImage} = require('../config/multer')
const { uploadFile, deleteImage, getAllImages, getSingleImage } = require('../models/operations.js');


const upload = uploadImage.array('image')
const uploadImages = (req, res) => {
    upload(req, res, async (err) => {

        if (err) return res.status(400).json(err.message)
        try {
            if (req.files) {
                let results = [];
                let error = [];
                let numberOfImages = 0
                let failureCounter = 0
                for (file of req.files) {
                    const options = { resource_type: "image", folder: `techBuddy/${req.user.username}/images/` }
                    const response = await uploadFile(file.path, options, req.user._id, req.body.description)
                    if (response.error) {
                        error.push(response);
                        failureCounter++
                    } else {
                        numberOfImages++
                        results.push(response)
                    }
                }
                if (error.length > 0) return res.status(201).json({ response: results.flat(), success: "Successfully uploaded " + numberOfImages + " image(s)", failed: failureCounter + "image(s) failed to upload", error: error })
                return res.status(201).json({ response: results.flat(), message: "Successfully uploaded " + numberOfImages + " image(s)" })
            }
        } catch (e) {
            console.log('executed')
            return res.status(400).json(e)
        }
    })
}

const getImages =  async (req, res) => {
    try {
        const response = await getAllImages(req.user._id)
        if(response.notFound)return res.status(404).json(response)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({ error: e })
    }

}

const getImageByName = async (req, res) => {
    try {
        if (req.params.name) {
            const response = await getSingleImage(req.user._id, req.params.name)

            if(response.notFound) return res.status(404).send("not found")
            return res.status(200).json(response)
        }
        return res.status(406).json({ error: "Image name is require in the parameter" })
    } catch (e) {
        return res.status(400).json({ error: "error occured " + e })
    }

}

const deleteImageByName = async (req, res) => {
    try {
        if (req.params.name) {
            const results = await deleteImage(req.params.name, req.user._id)
            if (results.notFound) return res.status(404).json(results);
            return res.json(results)
        }
        return res.status(406).json({ error: "Image name is required in the parameter " })
    } catch (e) {
        return res.status(400).json({ error: e })
    }
}


module.exports = {uploadImages,getImages,getImageByName,deleteImageByName}


