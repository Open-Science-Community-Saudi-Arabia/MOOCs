const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types,
        ref: "admin",
        default: ""
    },
    title: {
        type: String,
        required: true
    },
    tutorName: {
        type: String,
        required: true
    },
    video: {
        videoId: String,
        videoUrl: String
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Video = model("video", videoSchema)

module.exports = Video