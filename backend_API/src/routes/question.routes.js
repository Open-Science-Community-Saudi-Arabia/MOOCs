const router = require("express").Router();
const permit = require("../middlewares/permission_handler");
const { basicAuth } = require("../middlewares/auth");

const { createQuestion, getQuestions, deleteQuestion, updateQuestion, scoreAnswers } = require("../controllers/question.controllers")

router.all('/', basicAuth, permit('Admin'))

router
    .post("/new", createQuestion)
    .get("/", permit('EndUser'), getQuestions)
    .patch("/update/:id", updateQuestion)
    .delete("/delete/:id", deleteQuestion)
    .post("/grade", permit('EndUser'), scoreAnswers)

module.exports = router