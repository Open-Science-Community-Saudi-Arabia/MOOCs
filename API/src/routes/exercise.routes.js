const router = require("express").Router();

const permission = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

const {
    createExercise, getExercises, updateExercise,
    deleteExercise, addQuestionToExercise, removeQuestionFromExercise,
} = require("../controllers/exercise.controllers")

router.use(basicAuth())

router
    .get("/exercise", getExercises)
    .post("/exercise/new", createExercise)
    .patch("/exercise/update", updateExercise)
    .delete("/exercise/delete", deleteExercise)
    .post("/exercise/question/link", addQuestionToExercise)
    .delete("/exercise/question/removelink", removeQuestionFromExercise)

module.exports = router