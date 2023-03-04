const { Question, Exercise, Video, Course } = require('../models/course.models')
const { arrayOfCapitalLetters } = require('../utils/alphabets')
const asyncWrapper = require('../utils/async_wrapper')
const { BadRequestError, NotFoundError } = require('../utils/errors')


// Add a new question to a particular exercise - req.body.exercise_id = the id of the exercise you want to add a question \
/**
 * Create Question
 * 
 * @param {string} question
 * @param {string} correct_answer
 * @param {Array} options
 * @param {string} exercise_id 
 * 
 * @returns {MongooseObject} savedQuestion
 * 
 * @throws {error} if an error occured 
 */
exports.createQuestion = async (req, res, next) => {
    const {
        exercise_id, question,
        correct_answer, options
    } = req.body

    if (exercise_id) {
        const exercise = await Exercise.findById(exercise_id)

        if (!exercise) {
            return next(new NotFoundError("Exercise not found"))
        }
    }

    // Convert options from array to map
    // use the alphabets as keys
    /*
        i.e
            A - option[0]
            B - option[1]
            C - option[2]
            D - option[3]
    */
    const alphabets = arrayOfCapitalLetters()
    const index_of_correct_answer = options.indexOf(correct_answer)
    let options_map = new Map()
    for (let i; i < options.length; i++) {
        options_map.set(alphabets[i], options[i])

        if (i == index_of_correct_answer) {
            const correct_option = alphabets[i]
        }
    }

    const question_obj = await Question.create({
        exercise: exercise?._id,
        question,
        correct_option,
        options
    })

    return res.status(200).send({
        success: true,
        data: {
            question: question_obj
        }
    })
}


// Get questions for a particular exercise - req.body.exercise_id = the id of the course
// Get questions for all exercises - req.body = {} // empty
// Get data for a particular question - req.body._id = question._id
/**
 * Get Questions
 * 
 * @returns {MongooseObject} questions
 */
exports.getQuestions = async (req, res, next) => {
    // if any specifi query was added
    if (req.body) {
        const questions = await Question.find(req.body)

        return res.status(200).json({
            success: true,
            data: {
                questions
            }
        });
    }
    const questions = await Question.find().sort({ _id: -1 })

    return res.status(200).json({
        success: true,
        data: {
            exercises
        }
    });
}


// Update data for a particular question
/**
 * Update Question data
 * 
 * @param {string} id - Id of the question
 * 
 * @returns {MongooseObject} - question
 * 
 * @throws {BadRequestError} if question not found
 */
exports.updateQuestion = async (req, res, next) => {
    const question = await Question.findById(req.params.id);

    if (question) {
        await question.updateOne({ $set: req.body });

        return res.status(200).json({ message: "Question Updated", question: question });
    }

    next(new BadRequestError("Question not found"));
}


// Delete a particular question
/**
 * Delete a particular questions
 * 
 * @param {string} id - Id of the question
 * 
 * @throws {error} if an error occured
 */
exports.deleteQuestion = async (req, res, next) => {
    const questionId = req.params.questionId
    await Question.findByIdAndDelete(questionId)

    res.status(200).send({ message: "question has been deleted successfully" })
}


// Score answers for a particular exercise - req.body.exercise_id = the id of the exercise you want to score answers for
/**
 * Score anwers
 * 
 * @param {string} exercise_id
 * 
 * @returns {number} score
 * 
 * @throws {error} if an error occured
 */
exports.scoreAnswers = async (req, res, next) => {
    const exercise = await Exercise.findById(req.body.exercise_id)

    const studentAnswers = req.body.studentAnswers
    const correctAnswers = exercise.questions.map(question => question.correct_answer)

    let score = 0
    for (let i = 0; i < studentAnswers.length; i++) {
        if (studentAnswers[i] === correctAnswers[i]) {
            score++
        }
    }

    res.status(200).send({ score: score })
}


