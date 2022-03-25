const cloudinary = require('../config/cloudinary');
const User = require('../models/schemas')

const uploadFile = async (path, options, userId,description) => {
    const results = await cloudinary.uploader.upload(path, options);
    if (!results.public_id) return { error: "Error occured! Check the file path and try again" }
    const user = await User.findById(userId)
    if (user) {
        const name = results.public_id.split('/')
        const path = name.slice(0, -1)
        if (results.resource_type !== 'video') {
            user.images.push({ name: name.slice(-1).toString(), url: results.secure_url, cloudinary_key: results.public_id, path: path.join('/'),description:description })
            const answer = await user.save()
            return answer.images.slice(-1)
        }
        user.videos.push({ name: name.slice(-1).toString(), url: results.secure_url, cloudinary_key: results.public_id, path: path.join('/'),description:description })
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
        user.images.push({ name: name.slice(-1).toString(), url: results.secure_url, cloudinary_key: results.public_id, path: path.join('/'),description:description })
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
            if (!image.length) return { notFound: "Image with name " + path + " not found" }
            const response = await cloudinary.uploader.destroy(image[0].cloudinary_key)
            if (response.result === 'ok') {
                try {
                    user.images.pull(image[0]._id)
                    await user.save()
                    return { success: "Successfully deleted image with name " + path }
                } catch (e) {
                    return { error:"error occured "+ e }
                }
            }
            return response


        } catch (e) {
            return { error: e }
        }
    }
    return "user not found" 
}

const deleteVideo = async (path, userId) => {
    const user = await User.findById(userId);
    if (user) {
        try {
            const video = user.videos.filter(ele => ele.name == path)
            
            if (!video.length) return { notFound: "Video with name " + path + " not found" }
            const response = await cloudinary.uploader.destroy(video[0].cloudinary_key, { resource_type: 'video' })
            if (response.result === 'ok') {
                try {
                    user.videos.pull(video[0]._id)
                    await user.save()
                    return { success: "Successfully deleted video with name " + path }
                } catch (e) {
                    return { error: "error database "+ e }
                }
            }
            return response
        } catch (e) {
            return { error:"error occured "+ e }
        }
    }
    return "user not found"
}

const getAllImages = async (userId) => {
    try {
       const user  =await User.findById(userId)
       if(!user.images.length)return 'no images found'
       return user.images
       

    } catch (e) {
        return 'user not found'
    }

}
const getSingleImage = async (userId,imageId) => {
    try {
       const user  =await User.findById(userId)
       const image = user.images.filter(ele=>ele.name===imageId);
       if(!image.length) return 'not found'
       return image
    } catch (e) {
        return 'user not found'
    }

}

const getAllVideos = async (userId) => {
    try {
       const user  = await User.findById(userId)
       if(!user.videos.length)return 'no videos found'
       return user.videos
       

    } catch (e) {
        return 'user not found'
    }

}
const getSingleVideo = async (userId,filename) => {
    try {
       const user  =await User.findById(userId)
       const video = user.videos.filter(ele=>ele.name===filename);
       if(!video.length)return 'not found'
       return video
    } catch (e) {
        return 'user not found'
    }

}



const updateFile = async (path, user) => {
    try {
        await cloudinary.api.update()
    } catch (e) {
        return { error:"error occured "+ e }
    }

}


module.exports =
{
    uploadFile,
    uploadBigFile,
    deleteImage,
    deleteVideo,
    getAllImages,
    getAllVideos,
    getSingleImage,
    getSingleVideo
}