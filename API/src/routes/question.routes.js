const router = require("express").Router();
const permit = require("../middlewares/permission_handler");
const { basicAuth } = require("../middlewares/auth");

const {
    createQuestion, getQuestions,
    deleteQuestion, updateQuestion,
    getQuestionData
} = require("../controllers/question.controllers")

router.use(basicAuth())

router
    .get("/", permit('EndUser'), getQuestions)
    .get("/:id", permit('EndUser'), getQuestionData)
    .post("/new", createQuestion)
    .patch("/update/:id", updateQuestion)
    .delete("/delete/:id", deleteQuestion)

module.exports = router