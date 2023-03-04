const { Question, Exercise, Video, Course } = require('../models/course.models')
const { arrayOfCapitalLetters } = require('../utils/alphabets')
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

    // Check if correct answer is among the options given
    if (!index_of_correct_answer) {
        return next(new BadRequestError('Correct answer is not in options'))
    }

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


/**
 * Get Questions
 * 
 * @description 
 * By default it gets all available questions, 
 * if req.body is provided it'll be used as query params
 * to make a more streamlined query result
 * 
 * @param {string} exercise_id - Course id
 * @param {string} _id - questions id
 * @param {string} correct_option - Correct option to question ['A', 'B', 'C' ...]
 * 
 * @returns {ArrayObject} Questions
 * 
 * @throws {error} if an error occured
 */
exports.getQuestions = async (req, res, next) => {
    // if any specific query was added
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
            questions
        }
    });
}

/**
 * Get qustion data
 * 
 * @param {string} id - id of question
 * 
 * @returns {Object} question
 * 
 * @throws {BadRequestError} if missing required param in request
 * @throws {NotFoundError} if question not found
 */
exports.getQuestionData = async (req, res, next) => {
    const question_id = req.params.id
    
    if (!question_id || question_id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const question = await Question.findById(question_id)

    return res.status(200).send({
        success: true,
        data: {
            question
        }
    })
}

// Update data for a particular question
/**
 * Update Question data
 * 
 * @param {string} id - Id of the question
 * 
 * @returns {MongooseObject} - question
 * 
 * @throws {NotFoundError} if question not found
 */
exports.updateQuestion = async (req, res, next) => {
    const question = await Question.findByIdAndUpdate(req.params.id, { $set: req.body });

    if (!question) {
        return next(new NotFoundError('Question not found'))
    }

    return res.status(200).json({
        success: true,
        data: {
            message: "Question Updated",
            question
        }
    });
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


