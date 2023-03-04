const mongoose = require("mongoose")
const Schema = mongoose.Schema


const questionSchema = new Schema({
    // Assuming questions are in quiz format
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
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
    // questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    isAvailable: { type: Boolean, default: true }
}, {
    timestamps: true,
})
exerciseSchema.virtual('questions', {
    localField: 'questions',
    foreignField: 'exercise',
    ref: 'Question'
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
    },
    isAvailable: { type: Boolean, default: true }
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
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    enrolled_users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true })
courseSchema.virtual('exercises', {
    localField: '_id',
    foreignField: 'course'
})

const Question = mongoose.model("Question", questionSchema)
const Exercise = mongoose.model("Exercise", exerciseSchema)
const Video = mongoose.model("Video", videoSchema)
const Course = mongoose.model("Course", courseSchema)

module.exports = { Video, Course, Question, Exercise }