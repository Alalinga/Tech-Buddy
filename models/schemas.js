const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    name: String,
    url: String,
    cloundinary_key: String,
    path: String
});
const videoSchema = new mongoose.Schema({
    name: String,
    url: String,
    cloundinary_key: String,
    path: String
});
const userSchema = new mongoose.Schema({
    username:{type: String,unique:true, required:true},
    email: {type: String,unique:true, required:true},
    password: {type: String, required:true},
    videos:[videoSchema],
    images:[imageSchema]

});

/** const Schemas = {
    imageSchema(db) {
        return new db.Schema({
            name: String,
            url: String,
            cloundinary_key: String,
        })
    },
    videoSchema(db) {
        return new db.Schema({
            name: String,
            url: String,
            cloundinary_key: String,

        })

    },
    userSchema(db) {
        return new db.Schema({
            username: String,
            email: String,
            videos: [this.videoSchema],
            images: [this.imageSchema]
        })
    }
} */

const User = mongoose.model("User",userSchema)

module.exports = User;