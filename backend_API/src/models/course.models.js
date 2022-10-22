const mongoose = require("mongoose")
const Schema = mongoose.Schema

const videoSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        // default: ""
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

const Video = mongoose.model("Video", videoSchema)

module.exports = Video