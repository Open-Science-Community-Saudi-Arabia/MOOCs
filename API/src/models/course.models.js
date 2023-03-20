/**
 * @category Backend API
 * @subcategory Models
 * 
 * @module Course Models
 * 
 * @requires mongoose
 */

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const options = {
    timestampsa: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
const questionSchema = new Schema({
    type: { type: String, default: "question"},
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
    type: { type: String, default: "exercise"},
    title: { type: String, required: true },
    description: { type: String, required: true },
    // questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    course_section: { type: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
    order: { type: Number, default: Date.now() },
}, options)
exerciseSchema.virtual('questions', {
    localField: '_id',
    foreignField: 'exercise',
    ref: 'Question'
})
exerciseSchema.pre('findById', function (next) {
    this.populate('questions')
    next()
})
exerciseSchema.pre('find', function (next) {
    this.populate('questions')
    next()
})
exerciseSchema.pre('findOne', function (next) {
    this.populate('questions')
    next()
})

const videoSchema = new Schema({
    type: { type: String, default: "video"},
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
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    course_section: { type: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
    category: {
        type: String,
        required: true
    },
    order: { type: Number, default: Date.now() },
    isAvailable: { type: Boolean, default: true }
}, options)

const textmaterialSchema = new Schema({
    type: { type: String, default: "textmaterial"},
    title: {
        type: String,
        required: true
    },
    file_url: {
        type: String,
        required: true
    },
    description: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    course_section: { type: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
    order: { type: Number, default: Date.now() },
    isAvailable: { type: Boolean, default: true }
}, options)


const courseSectionSchema = new Schema({
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    deleted: { type: Schema.Types.ObjectId, ref: 'Course' },
    order: { type: Number, default: Date.now() },
    contents: { type: Array, default: [] }
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
courseSectionSchema.virtual('textmaterials', {
    localField: '_id',
    foreignField: 'course_section',
    ref: 'TextMaterial',
    justOne: false
})

// For all find findOne and populate queries, populate the virtuals
// courseSectionSchema.pre('find', function (next) {
//     this.populate('videos exercises textmaterials').then( next() )
// })

function combineContents(courseSection) {
    courseSection.contents = [
        ...courseSection.videos,
        ...courseSection.exercises,
        ...courseSection.textmaterials
    ]

    courseSection.contents.sort((a, b) => {
        return a.order - b.order
    }
    )

    return courseSection
}

courseSectionSchema.post('find', async function (courseSections) {
    for (let courseSection of courseSections) {
        await combineContents(courseSection)
    }
})

courseSectionSchema.post('findOne', async function (courseSection) {
    const doc = await combineContents(courseSection)
    return doc.toObject()
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
    isAvailable: { type: Boolean, default: true },
    preview_image: { type: String, required: true },
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
}, options)

const courseReportSchema = new Schema(
    {
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        completed_exercises: [
            { type: Schema.Types.ObjectId, ref: "Exercise", default: [] },
        ],
        completed_videos: [
            { type: Schema.Types.ObjectId, ref: "Video", default: [] },
        ],
        completed_sections: [
            { type: Schema.Types.ObjectId, ref: "CourseSection", default: [] },
        ],
        isCompleted: { type: Boolean, default: false },
    },
    options
);

courseReportSchema.virtual('certificate', {
    localField: '_id',
    foreignField: 'course_report',
    ref: 'Certificate',
    justOne: true
})

const Question = mongoose.model("Question", questionSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Video = mongoose.model("Video", videoSchema);
const TextMaterial = mongoose.model("TextMaterial", textmaterialSchema);
const Course = mongoose.model("Course", courseSchema);
const CourseSection = mongoose.model("CourseSection", courseSectionSchema);
const ExerciseSubmission = mongoose.model(
    "ExerciseSubmission",
    submissionSchema
);
const CourseReport = mongoose.model("CourseReport", courseReportSchema);

module.exports = {
    Video, Course,
    CourseSection,
    Question, Exercise,
    CourseReport, TextMaterial,
    ExerciseSubmission,
};
