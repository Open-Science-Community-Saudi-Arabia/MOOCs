const router = require("express").Router();

const permission = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

const { createExercise, getExercises,
    deleteExercise, addQuestion,
    removeQuestion } = require("../controllers/exercise.controllers")

router.all('/', basicAuth)

router
    .post('/new', permission('Admin'), createExercise)
    .get('/get', permission('Admin EndUser'), getExercises)
    .patch('/update/:id', permission('Admin'), updateExercise)
    .delete('/delete/:id', permission('Admin'), deleteExercise)
    .patch('/question/add', permission('Admin'), addQuestion)
    .patch('/question/remove', permission('Admin'), removeQuestion)

module.exports = router