const mongoose = require("mongoose")
const Schema = mongoose.Schema


const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    // Assuming exercises are in quiz format
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
})

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
    exercises: [{type: mongoose.Types.ObjectId, ref: "Exercise"}],
}, { timestamps: true })

const Exercise = mongoose.model("Exercise", exerciseSchema)
const Video = mongoose.model("Video", videoSchema)
const Course = mongoose.model("Course", courseSchema)

module.exports = { Video, Course }