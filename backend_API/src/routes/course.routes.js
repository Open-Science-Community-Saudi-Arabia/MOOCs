
const router = require("express")()

const {createCourse, getCourses, deleteCourse} = require("../controllers/courses.controller")
const permission = require("../middlewares/permission_handler")
const {basicAuth} = require("../middlewares/auth")

router.post("/create-course/:courseId",basicAuth, permission("Admin"), createCourse)

router.get("/get-courses", basicAuth, permission("Admin EndUser"), getCourses)

router.delete("/delete-course/:courseId",basicAuth, permission("Admin"), deleteCourse)

module.exports = router
