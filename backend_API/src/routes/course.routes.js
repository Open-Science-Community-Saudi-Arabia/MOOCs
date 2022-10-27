
const router = require("express")()

const { createCourse, getCourses, deleteCourse, updateCourse, uploadVideo, getVideo } = require("../controllers/course.controllers")
const permission = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

router
    .post("/create-course/:courseId", basicAuth, permission("Admin"), createCourse)
    .get("/get-courses", basicAuth, permission("Admin EndUser"), getCourses)
    .patch("/update-course/:id", basicAuth, permission("Admin"), updateCourse)
    .delete("/delete-course/:courseId", basicAuth, permission("Admin"), deleteCourse)

router
    .post("/upload-video", basicAuth, permission("Admin"), uploadVideo)
    .get("/course/video", basicAuth, permission("Admin EndUser"), getVideo)

module.exports = router
