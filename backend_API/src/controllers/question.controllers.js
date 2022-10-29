const { Question, Exercise, Video, Course } = require('../models')
const asyncWrapper = require('../utils/async_wrapper')
const { BadRequestError } = require('../utils/custom_errors')



exports.createQuestion = asyncWrapper(
    async (req, res, next) => {
        const newQuestion = new Question(req.body);
        const savedQuestion = await newQuestion.save();
        res.status(200).json(savedQuestion);
    }
)

// Get questions for a particular exercise - req.body.exercise_id = the id of the course you want to get questions for 
// Get questions for all exercises - req.body = {} // empty
// Get data for a particular question - req.body._id = question._id
exports.getQuestions = asyncWrapper(
    async (req, res, next) => {
        if (req.body) {
            const questions = await Question.find(req.body)
            res.status(200).json(questions);
        }
        const questions = await Question.find().sort({ _id: -1 })

        return res.status(200).send({ questions: questions })
    }
)

exports.updateQuestion = asyncWrapper(
    async (req, res, next) => {
        const question = await Question.findById(req.params.id);

        if (question) {
            await question.updateOne({ $set: req.body });

            return res.status(200).json({ message: "Question Updated", question: question });
        }

        next(new BadRequestError("Question not found"));
    }
)

exports.deleteQuestion = asyncWrapper(
    async (req, res, next) => {
        const questionId = req.params.questionId
        await Question.findByIdAndDelete(questionId)

        res.status(200).send({ message: "question has been deleted successfully" })
    }
)

exports.scoreAnswers = asyncWrapper(
    async (req, res, next) => {
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
)

