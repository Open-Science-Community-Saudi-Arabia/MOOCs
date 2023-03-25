const router = require("express").Router();

const permit = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

const {
    createExercise, getExercises, getExerciseData, updateExercise,
    deleteExercise, addQuestionToExercise, removeQuestionFromExercise,
    scoreExercise, getPreviousSubmissionsForExercise, getSubmissionData
} = require("../controllers/exercise.controllers")

router.use(basicAuth())

router
    .get("/:id", getExerciseData)
    .get("/", getExercises)
    .post("/new", permit('Admin SuperAdmin'), createExercise)
    .patch("/update/:id", permit('Admin SuperAdmin'), updateExercise)
    .delete("/delete/:id", permit('Admin SuperAdmin'), deleteExercise)
    .post("/question/link", permit('Admin SuperAdmin'), addQuestionToExercise)
    .post("/score/:id", scoreExercise)
    .get("/submission/:id", getSubmissionData)
    .get("/submission/prev/:exerciseId", getPreviousSubmissionsForExercise)
// .delete("/question/removelink", permit('Admin SuperAdmin'), removeQuestionFromExercise)

module.exports = router