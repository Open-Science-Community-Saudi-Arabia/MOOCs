const { Question, Exercise, Video, Course } = require("../models/course.models")
const { BadRequestError, NotFoundError } = require("../utils/errors");

// Create a new exercise
/**
 * Create new exercise
 * 
 * @param {string} title - Exercise title
 * @param {string} description - Exercise description
 * @param {string} course_id - Course id
 * @param {string} duration - Course duration in time
 * 
 * @returns {MongooseObject} saved_exercise
 * 
 * @throws {error} if an error occured
 * @throws {NotFoundError} if course_id provided and it doesn't match any course in DB
 */
exports.createExercise = async (req, res, next) => {
    const { title, description, duration , course_id } = req.body

    // If user provided a course to link the exercise to
    if (course_id) {
        const course = await Course.findById(course_id)
        if (!course) {
            return next(new NotFoundError('Course not found'))
        }
    }

    const saved_exercise = await Exercise.create({
        title, description, duration, course: course?._id
    });

    return res.status(200).json({
        success: true,
        data: {
            exercise: saved_exercise
        }
    });
}


// Get exercises for a particular course - req.body.course_id = the id of the course you want to get exercises for
// Get exercises for all courses - req.body = {} // empty
// Get data for a particular exercise - req.body._id = exercise._id
/**
 * Get Exercises
 * 
 * @description 
 * By default it gets all available exercises, 
 * if req.body is provided it'll be used as query params
 * to make a more streamlined query result
 * 
 * @param {string} course_id - Course id
 * @param {string} _id - Exercise id
 * @param {string} title - Exercise title
 * @param {string} description - Exercise description
 * @param {string} duration - Exercise duration
 * 
 * @returns {ArrayObject} exercises
 * 
 * @throws {error} if an error occured
 */
exports.getExercises = async (req, res, next) => {
    // If any specific query was added 
    if (req.body) {
        const exercises = await Exercise.find(req.body)

        return res.status(200).json({
            success: true,
            data: {
                exercises
            }
        });
    }

    // Sort the exercises according to how they where added
    const exercises = await Exercise.find().sort({ _id: -1 })

    // Get only the available courses
    const available_courses = exercises.filter((exercise) => exercise.isAvailable)

    return res.status(200).json({
        success: true,
        data: {
            exercises: available_courses
        }
    });
}

/**
 * Get exercise data
 * 
 * @param {string} id - id of the exercise 
 * 
 * @returns {Object} exercise 
 */
exports.getExerciseData = async (req, res, next) => {
    const exercise_id = req.params.id

    if (!exercise_id || exercise_id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const exercise = await Exercise.findById(exercise_id).populate('questions')

    return res.status(200).send({
        success: true,
        data: {
            exercise: exercise.isAvailable ? exercise : null // return exercise only if it's available
        }
    })
}

// Update data for a particular exercise
/**
 * Update exercise data
 * 
 * @param {string} id
 * 
 * @returns {string} message
 * @returns {object} exercise
 * 
 * @throws {error} if an error occured
 * @throws {NotFoundError} if exercise not found
 */
exports.updateExercise = async (req, res, next) => {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, { $set: req.body });

    if (!exercise) {
        return next(new NotFoundError('Exercise not found'))
    }

    return res.status(200).json({
        success: true,
        data: {
            message: "Exercise Updated",
            exercise
        }
    });
}


// Delete a particular exercise
/**
 * Delete exercise
 * 
 * Doesn't literally delete the exercise, it only
 * makes it unavailable
 * 
 * @param {string} exercise_id
 * 
 * @throws {error} if an error occured
 * @throws {NotFoundError} if exercise not found
 * */
exports.deleteExercise = async (req, res, next) => {
    // Make exercise unavailable
    await Exercise.findByIdAndUpdate(req.body.exercise_id, { isAvailable: false })

    return res.status(200).send({
        success: true,
        data: {
            message: "Exercise deleted successfully"
        }
    })
}


// Add a question to an exercise
/**
 * Add question to exercise
 * 
 * @param {string} exercise_id
 * @param {string} question_id
 * 
 * @returns {string} message
 * 
 * @throws {error} if an error occured
 * @throws {NotFoundError} if Exercise not found
 * @throws {NotFoundError} if Course not found
 * */
exports.addQuestionToExercise = async (req, res, next) => {
    const { exercise_id, question_id } = req.body
    const exercise = await Exercise.findById(exercise_id)

    if (!exercise) {
        return next(new NotFoundError("Exercise not found"))
    }

    const question = await Question.findByIdAndUpdate(question_id, { exercise: exercise_id })
    if (!question) {
        return next(new NotFoundError("Question not found"))
    }

    return res.status(200).send({
        success: true,
        data: {
            message: "Question has been added to exercise",
            question
        }
    })
}


// Remove a question from an exercise
/**
 * Remove question from exercise
 * 
 * @param {string} question_id
 * 
 * @returns {string} message
 * 
 * @throws {NotFoundError} if Questin not found
 * @throws {error} if an error occured
 * */
exports.removeQuestionFromExercise = async (req, res, next) => {
    const { question_id } = req.body

    const question = await Question.findByIdAndUpdate(question_id, { exercise: null })
    if (!question) {
        return next(new NotFoundError("Question not found"))
    }

    return res.status(200).send({
        success: true,
        data: {
            message: "Question has been removed from exercise",
            question
        }
    })
}



