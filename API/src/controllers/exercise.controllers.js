const { Question, Exercise, Video, Course } = require("../models/course.models")
const { BadRequestError, NotFoundError } = require("../utils/errors");

// Create a new exercise
/**
 * Create new exercise
 * 
 * @param {string} title - Exercise title
 * @param {string} description - Exercise description
 * @param {string} course_id - Course id
 * 
 * @returns {MongooseObject} savedExercise
 * 
 * @throws {error} if an error occured
 */
exports.createExercise = async (req, res, next) => {
    const { title, description, duration, date } = req.body

    const saved_exercise = await Exercise.create({
        title, description, duration, date
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
 * @param {string} course_id - Course id
 * @param {string} _id - Exercise id
 * 
 * @returns {object} exercises
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


// Update data for a particular exercise
/**
 * Update exercise data
 * 
 * @access private
 * 
 * @param {string} id
 * 
 * @returns {string} message
 * @returns {object} exercise
 * 
 * @throws {error} if an error occured
 * @throws {BadRequestError} if exercise not found
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
 * @access private
 * 
 * @param {string} exerciseId
 * 
 * @returns {string} message
 * 
 * @throws {error} if an error occured
 * @throws {BadRequestError} if exercise not found
 * 
 * @todo delete all questions associated with the exercise
 * @todo delete all videos associated with the exercise
 * @todo delete all courses associated with the exercise
 * @todo delete all submissions associated with the exercise
 * @todo delete all submissions associated with the questions associated with the exercise
 * */
exports.deleteExercise = async (req, res, next) => {
    // Make exercise unavailable
    await Exercise.findByIdAndUpdate({ isAvailable: false })

    res.status(200).send({ 
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
 * @access private
 * 
 * @param {string} exercise_id
 * @param {string} question_id
 * 
 * @returns {string} message
 * 
 * @throws {error} if an error occured
 * */
exports.addQuestionToExercise = async (req, res, next) => {
    const exercise = await Exercise.findById(req.body.exercise_id)
    const question = await Question.findById(req.body.question_id)

    exercise.questions.push(question)
    await exercise.save()

    res.status(200).send({ message: "question has been added to exercise successfully" })
}


// Remove a question from an exercise
/**
 * Remove question from exercise
 * 
 * @access private
 * 
 * @param {string} exerciseId
 * @param {string} questionId
 * 
 * @returns {string} message
 * 
 * @throws {error} if an error occured
 * */
exports.removeQuestionFromExercise = async (req, res, next) => {
    const exerciseId = req.body.exerciseId
    const questionId = req.body.questionId
    const exercise = await Exercise.findById(exerciseId)
    exercise.questions.pull(questionId)
    await exercise.save()
    // await Question.findByIdAndDelete(questionId)
    res.status(200).send({ message: "question has been deleted from exercise successfully" })
}



