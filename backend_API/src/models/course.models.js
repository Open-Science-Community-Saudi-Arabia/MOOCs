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
}, { timestamps: true })

const courseSchema = new mongoose.Schema({
    tutorName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videos: [{ type: mongoose.Types.ObjectId, ref: "Video" }],
}, { timestamps: true })

const Video = mongoose.model("Video", videoSchema)
const Course = mongoose.model("Course", courseSchema)

module.exports = { Video, Course }