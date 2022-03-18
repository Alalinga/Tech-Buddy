const cloudinary = require('../config/cloudinary');
const User = require('../models/schemas')

const uploadFile = async (path, options, userId) => {

    const results = await cloudinary.uploader.upload(path, options);
    if (!results.public_id) return { error: "Error occured! Check the file path and try again" }
    const user = await User.findById(userId)
    if (user) {
        const name = results.public_id.split('/')
        const path = name.slice(0, -1)
        if (results.resource_type !== 'video') {
            user.images.push({ name: name.slice(-1).toString(), url: results.secure_url, cloundinary_key: results.public_id, path: path.join('/') })
            const answer = await user.save()
            return answer.images.slice(-1)
        }
        user.videos.push({ name: name.slice(-1).toString(), url: results.secure_url, cloundinary_key: results.public_id, path: path.join('/') })
        const answer = await user.save()
        return answer.videos.slice(-1)


    } else {
        return { error: "No user found with Id= " + userId }
    }
};
const uploadBigFile = async (path, options, userId) => {

    const results = await cloudinary.uploader.upload_large(path, options);
    if (!results.public_id) return { error: "Error occured! Check the file path and try again" }

    const user = await User.findById(userId)
    if (user) {
        const name = results.public_id.split('/')
        const path = name.slice(0, -1)
        user.images.push({ name: name.slice(-1).toString(), url: results.secure_url, cloundinary_key: results.public_id, path: path.join('/') })
        const answer = await user.save()
        return answer.images.slice(-1)

    } else {
        return { error: "No user found with Id= " + userId }
    }
};


const deleteImage = async (path, userId) => {
    const user = await User.findById(userId);
    if (user) {
        try {
            const image = user.images.filter(ele => ele.name == path)

            if (!image.length) return { error: "Image with name " + path + " not found" }
            const response = await cloudinary.uploader.destroy(image[0].cloundinary_key)
            if (response.result === 'ok') {
                try {
                    user.images.pull(image[0]._id)
                    await user.save()
                    return { success: "Successfully deleted image with name " + path }
                } catch (e) {
                    return { error: e }
                }
            }
            return response


        } catch (e) {
            return { error: e }
        }
    }
    return { error: "User not found" }
}

const deleteVideo = async (path, userId) => {
    const user = await User.findById(userId);
    if (user) {
        try {
            const video = user.videos.filter(ele => ele.name == path)
               console.log(video[0].cloundinary_key)
            if (!video.length) return { error: "Video with name " + path + " not found" }
            const response = await cloudinary.uploader.destroy(video[0].cloundinary_key,{resource_type: 'video'})
            if (response.result === 'ok') {
                try {
                    user.videos.pull(video[0]._id)
                    await user.save()
                    return { success: "Successfully deleted video with name " + path }
                } catch (e) {
                    return { error: e }
                }
            }
            return response
        } catch (e) {
            return { error: e }
        }
    }
    return { error: "User not found" }
}


module.exports =
{
    uploadFile,
    uploadBigFile,
    deleteImage,
    deleteVideo
}