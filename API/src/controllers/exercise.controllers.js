const { Question, Exercise, Video, Course, ExerciseSubmission } = require("../models/course.models")
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
    const { title, description, duration, course_id } = req.body

    // If user provided a course to link the exercise to
    let course = await Course.findById(course_id)
    if (!course) {
        return next(new NotFoundError('Course not found'))
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
    let exercises;
    // If any specific query was added 
    if (req.body) {
        exercises = await Exercise.find(req.body)
    }

    // Sort the exercises according to how they where added
    exercises = exercises ? await Exercise.find().populate('questions') : exercises

    // Get only the available courses
    const available_exercises = exercises.filter((exercise) => {
        if (exercise.isAvailable) return exercise.toJSON();
    })

    return res.status(200).json({
        success: true,
        data: {
            exercises: available_exercises
        }
    });
}

/**
 * Get exercise data
 * 
 * @param {string} id - id of the exercise 
 * 
 * @returns {Object} exercise 
 * 
 * @throws {BadRequestError} if missing required param in request
 * @throws {NotFoundError} if exercise not found
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
            exercise: exercise.isAvailable ? exercise.toJSON() : null // return exercise only if it's available
        }
    })
}

// Update data for a particular exercise
/**
 * Update exercise data
 * 
 * @param {string} id - id of exercise
 * 
 * @returns {string} message
 * @returns {object} exercise
 * 
 * @throws {error} if an error occured
 * @throws {NotFoundError} if exercise not found
 */
exports.updateExercise = async (req, res, next) => {
    const exercise_id = req.params.id

    if (!exercise_id || exercise_id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const exercise = await Exercise.findByIdAndUpdate(
        exercise_id,
        { $set: req.body },
        { new: true }
    );

    if (!exercise) {
        return next(new NotFoundError("Exercise not found"));
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
 * @param {string} id - id of exercise
 * 
 * @throws {error} if an error occured
 * @throws {NotFoundError} if exercise not found
 * */
exports.deleteExercise = async (req, res, next) => {
    const exercise_id = req.params.id

    if (!exercise_id || exercise_id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    // Make exercise unavailable
    await Exercise.findByIdAndUpdate(exercise_id, { isAvailable: false })

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
 * @throws {NotFoundError} if Question not found
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


/**
 * Score anwers
 * 
 * @description Score answers for a particular exercise
 * 
 * @param {string} id - exercise id
 * @param {Object} submission Object where keys are question_id's and values are selected option
 * 
 * @returns {Object} report
 * @returns {string} report.exercise report.user report.score submission
 * 
 * @throws {error} if an error occured
 */
exports.scoreExercise = async (req, res, next) => {
    const exercise_id = req.params.id

    if (!exercise_id || exercise_id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const students_submission = req.body.submission;
    if (!students_submission) {
        return next(
            new BadRequestError(
                "Missing required param `submission` in request body"
            )
        );
    }

    // Check if exercise exists
    const exercise_obj = await Exercise.findById(exercise_id).populate({
        path: "questions",
        select: "correct_option",
    });
    if (!exercise_obj) {
        return next(new NotFoundError("Exercise not found"));
    }

    const exercise = exercise_obj.toJSON();
    let score = 0;
    let exercise_submission = new ExerciseSubmission({
        user: req.user.id,
        exercise: exercise._id,
    });

    // Grade users submission
    exercise.questions.forEach((question) => {
        const submitted_option = students_submission[question._id.toString()];

        // Check if submitted option is correct. If yes, increment score
        if (question.correct_option == submitted_option) score++;

        exercise_submission.submission.push({
            question: question._id,
            submitted_option: submitted_option,
        });
    });

    exercise_submission.score = score
    exercise_submission = await exercise_submission.save()
    exercise_submission = await exercise_submission.populate('submission.question')

    return res.status(200).send({
        success: true,
        data: {
            report: exercise_submission
        }
    })
}

exports.getPreviousSubmissionsForExercise = async (req, res, next) => {
    console.log(req.params)
    const exercise_id = req.params.exerciseId

    if (!exercise_id || exercise_id == ':exerciseId') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const exercise = await Exercise.findById(exercise_id)
    if (!exercise) {
        return next(new NotFoundError('Exercise not found'))
    }

    const exercise_submissions = await ExerciseSubmission.find(
        { exercise: exercise._id, user: req.user.id }).populate('submission.question')

    return res.status(200).send({
        success: true,
        data: {
            submissions: exercise_submissions
        }
    })
}