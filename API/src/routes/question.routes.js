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
    .get("/", getQuestions)
    .get("/:id", getQuestionData)
    .post("/new", permit('Admin SuperAdmin'), createQuestion)
    .patch("/update/:id", permit('Admin SuperAdmin'), updateQuestion)
    .delete("/delete/:id", permit('Admin SuperAdmin'), deleteQuestion)

module.exports = router