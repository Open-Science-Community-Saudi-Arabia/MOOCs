const mongoose = require("mongoose")
const Schema = mongoose.Schema


const questionSchema = new Schema({
    // Assuming questions are in quiz format
    question: {
        type: String,
        required: true
    },
    correct_answer: {
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
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    video_url: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true })

const courseSchema = new mongoose.Schema({
    author: {
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
    enrolled_users: [{ type: mongoose.Types.ObjectId, ref: "User" }]
}, { timestamps: true })

const Question = mongoose.model("Question", questionSchema)
const Exercise = mongoose.model("Exercise", exerciseSchema)
const Video = mongoose.model("Video", videoSchema)
const Course = mongoose.model("Course", courseSchema)

module.exports = { Video, Course, Question, Exercise }