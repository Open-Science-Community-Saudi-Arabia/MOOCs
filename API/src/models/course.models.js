/**
 * @category Backend API
 * @subcategory Models
 * 
 * @module CourseModel
 * 
 * @description This module contains the models for courses,
 * such as the course model, the course section model, the exercise model, and the question model.
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

/**
 * @typedef {Object} questionSchema
 * 
 * @description This schema is used to store questions for exercises.
 * 
 * @property {String} type - The type of the document, "question"
 * @property {ObjectId} exercise - The exercise to which the question belongs
 * @property {String} question - The question
 * @property {String} correct_option - The correct option
 * @property {Array} options - The options for the question
 */

/**
 * @typedef {Object} exerciseSchema
 * 
 * @description This schema is used to store exercises.
 * 
 * @property {String} type - The type of the document, "exercise"
 * @property {String} title - The title of the exercise
 * @property {String} description - The description of the exercise
 * @property {Number} duration - The duration of the exercise
 * @property {Date} date - The date the exercise was created
 * 
 * @property {ObjectId} course - The course to which the exercise belongs
 * @property {ObjectId} course_section - The course section to which the exercise belongs
 * @property {Number} order - The order of the exercise in the course section
 * 
 * @property {MongooseVirtualType[]} questions - The questions for the exercise
 * */

/**
 * @typedef {Object} videoSchema
 * 
 * @description This schema is used to store videos.
 * 
 * @property {String} type - The type of the document, "video"
 * @property {String} title - The title of the video
 * @property {String} description - The description of the video
 * @property {String} video_url - The url of the video
 * @property {Number} duration - The duration of the video
 * @property {ObjectId} course - The course to which the video belongs
 * @property {ObjectId} course_section - The course section to which the video belongs
 * @property {Number} order - The order of the video in the course section
 * @property {String} category - The category of the video (e.g. "Programming", 
 * "Mathematics", "Physics", "Chemistry")
 * @property {Boolean} isAvailable - Whether the video is available to the user
 * 
 * @see {@link module:CourseModel~courseSectionSchema CourseSection}
 * @see {@link module:CourseModel~courseSchema Course}
 */

/**
 * @typedef {Object} textmaterialSchema
 * 
 * @description This schema is used to store text materials.
 * 
 * @property {String} type - The type of the document, "text_material"
 * @property {String} title - The title of the text material
 * @property {String} description - The description of the text material
 * 
 */

/**
 * @typedef {Object} courseSectionSchema
 * 
 * @description This schema is used to store course sections.
 * 
 * @property {String} type - The type of the document, "course_section"
 * @property {String} title - The title of the course section
 * @property {Number} order - The order of the course section in the course
 * @property {ObjectId} course - The course to which the course section belongs
 * @property {MongooseVirtualType[]} contents - The contents of the course section
 * 
 * <br>
 * 
 * <b>NOTE:</b> The contents of the course section are stored as an array of virtuals.
 * This is because the contents can be either an exercises, videos or text materials
 * 
 * @see {@link module:CourseModel~exerciseSchema Exercise}
 * @see {@link module:CourseModel~videoSchema Video}
 * @see {@link module:CourseModel~textmaterialSchema TextMaterial}
 * */

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
    course_section: { type: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
    order: { type: Number, default: Date.now() },
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
        ...courseSection.videos??[],
        ...courseSection.exercises??[],
        ...courseSection.textmaterials??[]
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