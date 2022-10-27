const mongoose = require("mongoose")
const Schema = mongoose.Schema


const questionSchema = new Schema({
    // Assuming questions are in quiz format
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    }
})

const exerciseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
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
    exercises: [{ type: mongoose.Types.ObjectId, ref: "Exercise" }],
}, { timestamps: true })

const Question = mongoose.model("Question", questionSchema)
const Exercise = mongoose.model("Exercise", exerciseSchema)
const Video = mongoose.model("Video", videoSchema)
const Course = mongoose.model("Course", courseSchema)

module.exports = { Video, Course, Question, Exercise }