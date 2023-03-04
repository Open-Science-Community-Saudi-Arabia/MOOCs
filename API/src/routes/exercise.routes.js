const router = require("express").Router();

const permit = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

const {
    createExercise, getExercises, updateExercise,
    deleteExercise, addQuestionToExercise, removeQuestionFromExercise,
} = require("../controllers/exercise.controllers")

router.use(basicAuth())

router
    .get("/exercise", getExercises)
    .post("/exercise/new", permit('Admin SuperAdmin'), createExercise)
    .patch("/exercise/update", permit('Admin SuperAdmin'), updateExercise)
    .delete("/exercise/delete", permit('Admin SuperAdmin'), deleteExercise)
    .post("/exercise/question/link", permit('Admin SuperAdmin'), addQuestionToExercise)
    .delete("/exercise/question/removelink", permit('Admin SuperAdmin'), removeQuestionFromExercise)

module.exports = router