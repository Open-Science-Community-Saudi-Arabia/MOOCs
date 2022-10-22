
const router = require("express")()

const express = require("expres")
const {getCourses, deleteCourse} = require("../controllers/courses.controller")
const permission = require("../middlewares/permissions_handler")
const {basicAuth} = require("../middlewares/auth")

router.get("/get-courses", basicAuth(req, res, next), permission("Admin EndUser"), getCourses)

router.delete("/delete-course/:courseId",basicAuth(req, res, next), basicAuth(req, res, next), permission("Admin"), deleteCourse)

module.exports = router