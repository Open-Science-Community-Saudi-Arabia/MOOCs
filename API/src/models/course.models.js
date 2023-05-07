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
const { translateDoc } = require("../utils/crowdin")
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
 * 
 * @see {@link module:CourseModel~exerciseSchema Exercise}
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
 * 
 * @see {@link module:CourseModel~courseSectionSchema CourseSection}
 * @see {@link module:CourseModel~courseSchema Course}
 * @see {@link module:CourseModel~questionSchema Question}
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
 * @description This schema is used to store text materials. text materials 
 * are documents such as pdfs, word documents, etc. that are used within the course
 * 
 * @property {String} type - The type of the document, "text_material"
 * @property {String} title - The title of the text material
 * @property {String} file_url - The url of the text material
 * @property {ObjectId} course - The course to which the text material belongs
 * @property {ObjectId} course_section - The course section to which the text material belongs
 * @property {Number} order - The order of the text material in the course section
 * @property {Boolean} isAvailable - Whether the text material is available to the user
 * 
 * @see {@link module:CourseModel~courseSectionSchema CourseSection}
 * @see {@link module:CourseModel~courseSchema Course}
 */

/**
 * @typedef {Object} downloadableResourceSchema
 * 
 * @description This schema is used to store downloadable resources.
 * These are resources that can be downloaded by the user. they are usually
 * links to files such as pdfs, word documents, etc.
 * 
 * @property {String} type - The type of the document, "downloadable_resource"
 * @property {String} title - The title of the downloadable resource
 * @property {String} file_url - The url of the downloadable resource
 * @property {ObjectId} course - The course to which the downloadable resource belongs
 * @property {Number} order - The order of the downloadable resource in the course section
 * @property {Boolean} isAvailable - Whether the downloadable resource is available to the user
 *  
 * @see {@link module:CourseModel~courseSchema Course}
 * */

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
 * @property {Boolean} isAvailable - Whether the course section is available to the user
 * @property {MongooseVirtualType[]} exercises - The exercises in the course section
 * @property {MongooseVirtualType[]} videos - The videos in the course section
 * @property {MongooseVirtualType[]} textmaterials - The text materials in the course section
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

/**
 * @typedef {Object} courseSchema
 * 
 * @description This schema is used to store courses.
 * 
 * @property {String} title - The title of the course
 * @property {String} description - The description of the course
 * @property {String} author - The author of the course
 * @property {MongooseVirtualType[]} course_sections - The course sections in the course
 * @property {MongooseVirtualType[]} exercises - The exercises in the course
 * @property {MongooseVirtualType[]} videos - The videos in the course
 * @property {MongooseVirtualType[]} textmaterials - The text materials in the course
 * 
 * @see {@link module:CourseModel~courseSectionSchema CourseSection}
 * @see {@link module:CourseModel~exerciseSchema Exercise}
 * @see {@link module:CourseModel~videoSchema Video}
 * @see {@link module:CourseModel~textmaterialSchema TextMaterial}
 */

/**
 * @typedef {Object} submissionSchema
 * 
 * @description This schema is used to store the record of all the submissions 
 * for a particular exercise made by a particular user.
 * 
 * @property {ObjectId} user - The user who made the submission
 * @property {ObjectId} exercise - The exercise for which the submission was made
 * @property {Number} score - The score of the submission
 * @property {Object} submission - The submission
 * @property {String} submission.question - The question
 * @property {String} submission.correct_option - The correct option
 * @property {String} submission.submitted_option - The option selected by the user
 * 
 * @property {Date} date - The date the submission was made
 * 
 * @see {@link module:CourseModel~exerciseSchema Exercise}
 * @see {@link module:UserModel~userSchema User}
 */

/**
 * @typedef {Object} courseReportSchema
 * 
 * @description This schema is used to track the progress of a user in a course.
 * 
 * @property {ObjectId} user - The user
 * @property {ObjectId} course - The course
 * @property {ObjectId[]} completed_exercises - The exercises completed by the user
 * @property {ObjectId[]} completed_videos - The videos completed by the user
 * @property {ObjectId[]} completed_course_sections - The course sections completed by the user
 * @property {Boolean} isCompleted - Whether the user has completed the course
 * 
 * @see {@link module:CourseModel~exerciseSchema Exercise}
 * @see {@link module:CourseModel~videoSchema Video}
 * @see {@link module:CourseModel~courseSectionSchema CourseSection}
 * @see {@link module:CourseModel~courseSchema Course}
 * @see {@link module:UserModel~userSchema User}
 */

/**
 * @type {questionSchema}
 */
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
    question_tr: {
        type: String,
    },
    correct_option_tr: {
        type: String,
    },
    options: [{ type: String }]
}, options)

/**
 * @type {exerciseSchema}
 */
const exerciseSchema = new Schema({
    type: { type: String, default: "exercise", minLength: 3, maxLength: 40 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    // questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    course_section: { type: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
    order: { type: Number, default: Date.now() },
    title_tr: { type: String },
    description_tr: { type: String },
}, options)
exerciseSchema.virtual('questions', {
    localField: '_id',
    foreignField: 'exercise',
    ref: 'Question'
})

/**
 * @type {videoSchema}
 * */
const videoSchema = new Schema({
    type: { type: String, default: 'video' },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minLength: 3, maxLength: 40
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
    isAvailable: { type: Boolean, default: true },
    title_tr: {
        type: String,
        minLength: 3, maxLength: 40
    },
    description_tr: { type: String },
}, options)
videoSchema.post('save', async function(next) {
    const translated_doc = await translateDoc(this)
    next()()
})
videoSchema.virtual('downloadable_resources', {
    localField: '_id',
    foreignField: 'video',
    ref: 'DownloadableResource'
})

/**
 * @type {textmaterialSchema}
 * */
const textmaterialSchema = new Schema({
    type: { type: String, default: "slide", minLength: 3, maxLength: 40 },
    title: {
        type: String,
        required: true
    },
    description: { type: String, required: true },
    file_url: {
        type: String,
        required: true
    },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    course_section: { type: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
    order: { type: Number, default: Date.now() },
    isAvailable: { type: Boolean, default: true },
    title_tr: {
        type: String,
    },
    description_tr: { type: String },
}, options)
textmaterialSchema.virtual('downloadable_resources', {
    localField: '_id',
    foreignField: 'textmaterial',
    ref: 'DownloadableResource'
})
textmaterialSchema.post('save', async function() {
    const translated_doc = await translateDoc(this)
    next()
})

/**
 * @type {downloadableResourceSchema}
 */
const downloadableResourceSchema = new Schema({
    resource_type: { type: String, required: true },
    file_url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    video: { type: Schema.Types.ObjectId, ref: 'Video' },
    textmaterial: { type: Schema.Types.ObjectId, ref: 'TextMaterial' },
    order: { type: Number, default: Date.now() },
    isAvailable: { type: Boolean, default: true },
    title_tr: { type: String },
    description_tr: { type: String },
}, options)
downloadableResourceSchema.post('save', async function() {
    const translated_doc = await translateDoc(this)
    next()
})

/**
 * @type {courseSectionSchema}
 * */
const courseSectionSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 40 },
    title_tr: { type: String, minLength: 3, maxLength: 40 },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    deleted: { type: Schema.Types.ObjectId, ref: 'Course' },
    order: { type: Number, default: Date.now() },
}, options)
courseSectionSchema.post('save', async function() {
    const translated_doc = await translateDoc(this)
    next()
})

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


/**
 * @description Combines the contents of the course section into one array
 * and sorts them by their order
 * 
 * @param {courseSectionSchema} courseSection 
 * @returns {courseSectionSchema}
 */
function combineContents(courseSection) {
    courseSection.contents = [
        ...courseSection.videos ?? [],
        ...courseSection.exercises ?? [],
        ...courseSection.textmaterials ?? []
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

/**
 * @type {courseSchema}
 */
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
    title_tr: {
        type: String,
    },
    description_tr: {
        type: String,
    },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    enrolled_users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    preview_image: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
}, options)
courseSchema.pre('save', async function() {
    const translated_doc = await translateDoc(this)
})

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

/**
 * @type {submissionSchema}
 * */
const exerciseSubmissionSchema = new Schema({
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
    percentage_passed: { type: Number, default: 0 },
    report: { type: Schema.Types.ObjectId, ref: "ExerciseReport", required: true }
}, options)
exerciseSubmissionSchema.pre('save', async function (next) {
    // check if score was updated
    if (this.isModified('score')) {
        // get the exercise
        const { exercise } = await this.populate({
            path: 'exercise',
            populate: 'questions'
        })

        this.percentage_passed = (this.score / exercise.questions.length) * 100
    }

    next()
})

const exerciseReportSchema = new Schema({
    exercise: { type: Schema.Types.ObjectId, ref: 'ExerciseReport', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course_report: { type: Schema.Types.ObjectId, ref: 'CourseReport', required: true },
    best_score: { type: Number, default: 0 },
    percentage_passed: { type: Number, default: 0 },
})
exerciseReportSchema.virtual('submissions', {
    localField: '_id',
    foreignField: 'report',
    ref: "ExerciseSubmission",
    justOne: false
})
exerciseReportSchema.pre('save', async function (next) {
    // check if score was updated
    if (this.isModified('best_score')) {
        // get the exercise
        const exercise = await Exercise.findById(this.exercise).populate('questions')

        this.percentage_passed = (this.best_score / exercise.questions.length) * 100
    }
    next()
})

/**
 * @type {courseReportSchema}
 */
const courseReportSchema = new Schema(
    {
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        percentage_passed: { type: Number, default: 0 },
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
courseReportSchema.virtual('attempted_exercises', {
    localField: '_id',
    foreignField: 'course_report',
    ref: 'ExerciseReport',
    justOne: false
})

courseReportSchema.methods.updateBestScore = async function () {
    const doc = (await this.populate([
        {
            path: 'attempted_exercises',
        },
        {
            path: 'course',
            populate: 'exercises'
        }
    ])).toObject();

    const attempted_exercises = doc.attempted_exercises;
    const required_exercises = doc.course.exercises;
    let total_scores = 0
    for (let i = 0; i < attempted_exercises.length; i++) {
        total_scores += attempted_exercises[i].percentage_passed
    }

    // Calculate the average percentage passed 
    this.percentage_passed = total_scores / required_exercises.length

    // Update the isCompleted field if the percentage passed is greater than or equal to 80
    this.isCompleted = this.percentage_passed >= 80 ? true : false;

    return this.save();
}


const Question = mongoose.model("Question", questionSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Video = mongoose.model("Video", videoSchema);
const TextMaterial = mongoose.model("TextMaterial", textmaterialSchema);
const DownloadableResource = mongoose.model('DownloadableResource', downloadableResourceSchema)
const Course = mongoose.model("Course", courseSchema);
const CourseSection = mongoose.model("CourseSection", courseSectionSchema);
const ExerciseSubmission = mongoose.model(
    "ExerciseSubmission",
    exerciseSubmissionSchema
);
const ExerciseReport = mongoose.model('ExerciseReport', exerciseReportSchema)
const CourseReport = mongoose.model("CourseReport", courseReportSchema);

module.exports = {
    Video, Course,
    CourseSection,
    Question, Exercise,
    CourseReport, TextMaterial,
    ExerciseSubmission, ExerciseReport,
    DownloadableResource
};