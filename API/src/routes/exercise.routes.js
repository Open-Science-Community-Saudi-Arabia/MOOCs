const router = require("express").Router();

const permit = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

const {
    createExercise, getExercises, getExerciseData, updateExercise,
    deleteExercise, addQuestionToExercise, removeQuestionFromExercise,
    scoreExercise, getPreviousSubmissionsForExercise
} = require("../controllers/exercise.controllers")

router.use(basicAuth())

router
    .get("/", getExercises)
    .get("/:id", getExerciseData)
    .post("/new", permit('Admin SuperAdmin'), createExercise)
    .patch("/update/:id", permit('Admin SuperAdmin'), updateExercise)
    .delete("/delete/:id", permit('Admin SuperAdmin'), deleteExercise)
    .post("/question/link", permit('Admin SuperAdmin'), addQuestionToExercise)
    .post("/score/:id", scoreExercise)
    .get("/submission/:exerciseId", getPreviousSubmissionsForExercise)
    // .delete("/question/removelink", permit('Admin SuperAdmin'), removeQuestionFromExercise)

module.exports = router