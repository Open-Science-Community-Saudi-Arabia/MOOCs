const mongoose = require("mongoose")
const Schema = mongoose.Schema

const options = {
    timestampsa: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
const questionSchema = new Schema({
    // Assuming questions are in quiz format
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    question: {
        type: String,
        required: true
    },
    correct_option: {
        type: String,
        required: true,
    },
    options: [{ type: String }]
}, options)

const exerciseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    course_section: { tupe: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
    isAvailable: { type: Boolean, default: true },
}, options)
exerciseSchema.virtual('questions', {
    localField: '_id',
    foreignField: 'exercise',
    ref: 'Question'
})

const videoSchema = new Schema({
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
    course_section: { tupe: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
    category: {
        type: String,
        required: true
    },
    isAvailable: { type: Boolean, default: true }
}, options)

const courseSectionSchema = new Schema({
    title: { type: String, required: true },
    course: { type: Schema.ObjectId, ref: 'Course', required: true },
    deleted: {type: Schema.ObjectId, ref: 'Course'},
    isCompleted: { type: Boolean, default: false }
}, options)
courseSectionSchema.virtual('videos', {
    localField: '_id',
    foreignField: 'course_section',
    ref: 'Video',
    justOne: false
})
courseSectionSchema.virtual('exercises', {
    localField: '_id',
    foreignField: 'course_section',
    ref: 'Exercise',
    justOne: false
})

const courseSchema = new Schema({
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
}, options)
courseSchema.virtual('exercises', {
    localField: '_id',
    foreignField: 'course',
    ref: 'Exercise'
})
courseSchema.virtual('course_sections', {
    localField: '_id',
    foreignField: 'course',
    ref: 'CourseSection'
})

const submissionSchema = new Schema({
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    submission: [{
        type: new Schema({
            question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
            submitted_option: { type: String },
            correct_option: { type: String }
        })
    }],
    score: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false }
}, options)

const Question = mongoose.model("Question", questionSchema)
const Exercise = mongoose.model("Exercise", exerciseSchema)
const Video = mongoose.model("Video", videoSchema)
const Course = mongoose.model("Course", courseSchema)
const ExerciseSubmission = mongoose.model('ExerciseSubmission', submissionSchema)

module.exports = { Video, Course, Question, Exercise, ExerciseSubmission }