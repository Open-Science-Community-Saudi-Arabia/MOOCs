
const router = require("express").Router();

const { createCourse, getCourses, deleteCourse, updateCourse, uploadVideo, getVideo, updateVideo } = require("../controllers/course.controllers")
const permission = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

router.all('/', basicAuth)

router
    .post("/new", permission("Admin"), createCourse)
    .get("/", permission("Admin EndUser"), getCourses)
    .patch("/update/:id", permission("Admin"), updateCourse)
    .delete("/delete/:courseId", permission("Admin"), deleteCourse)

router
    .post("/video/upload", permission("Admin"), uploadVideo)
    .get("/course/video", permission("Admin EndUser"), getVideo)
    .patch("/video/update/:id", permission("Admin"), updateVideo)



module.exports = router
