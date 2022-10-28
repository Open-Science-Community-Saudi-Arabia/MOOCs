const { Question, Exercise, Video, Course } = require("../models/course.models")

exports.createExercise = asyncWrapper(
    async (req, res, next) => {
        const newExercise = new Exercise(req.body);
        const savedExercise = await newExercise.save();
        res.status(200).json(savedExercise);
    }
)

// Get exercises for a particular course - req.body.course_id = the id of the course you want to get exercises for
// Get exercises for all courses - req.body = {} // empty
// Get data for a particular exercise - req.body._id = exercise._id
exports.getExercises = asyncWrapper(
    async (req, res, next) => {
        if (req.body) {
            const exercises = await Exercise.find(req.body)
            res.status(200).json(exercises);
        }
        const exercises = await Exercise.find().sort({ _id: -1 })

        return res.status(200).send({ exercises: exercises })
    }
)

exports.updateExercise = asyncWrapper(
    async (req, res, next) => {
        const exercise = await Exercise.findById(req.params.id);

        if (exercise) {
            await exercise.updateOne({ $set: req.body });

            return res.status(200).json({ message: "Exercise Updated", exercise: exercise });
        }

        next(new BadRequestError("Exercise not found"));
    }
)

exports.deleteExercise = asyncWrapper(
    async (req, res, next) => {
        const exerciseId = req.params.exerciseId
        await Exercise.findByIdAndDelete(exerciseId)

        res.status(200).send({ message: "exercise has been deleted successfully" })
    }
)
    
exports.addQuestionToExercise = asyncWrapper(
    async (req, res, next) => {
        const exerciseId = req.params.exerciseId
        const exercise = await Exercise.findById(exerciseId)
        const question = new Question(req.body)
        await question.save()
        exercise.questions.push(question)
        await exercise.save()
        res.status(200).send({ message: "question has been added to exercise successfully" })
    }
)

exports.deleteQuestionFromExercise = asyncWrapper(
    async (req, res, next) => {
        const exerciseId = req.params.exerciseId
        const questionId = req.params.questionId
        const exercise = await Exercise.findById(exerciseId)
        exercise.questions.pull(questionId)
        await exercise.save()
        // await Question.findByIdAndDelete(questionId)
        res.status(200).send({ message: "question has been deleted from exercise successfully" })
    }
)

