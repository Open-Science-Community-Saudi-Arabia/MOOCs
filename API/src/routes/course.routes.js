
const router = require("express").Router();

const { createCourse, getCourses, getCourseData,
    deleteCourse, updateCourse,
    uploadVideo, getVideoData, getCourseVideos,
    updateVideo, enrollCourse, cancelEnrollment,
    getEnrolledCourses, getEnrolledUsers,
    addVideoToCourse, removeVideoFromCourse, deleteVideo, addExerciseToCourse } = require("../controllers/course.controllers")

const permit = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

router.use(basicAuth())

router
    .post("/new", permit("Admin SuperAdmin"), createCourse)
    .patch("/update/:id", permit("Admin SuperAdmin"), updateCourse)
    .delete("/delete/:id", permit("Admin SuperAdmin"), deleteCourse)
    .post("/enroll/:id", permit("Admin EndUser SuperAdmin"), enrollCourse)
    .post("/cancelenrollment/:id", permit("Admin EndUser SuperAdmin"), cancelEnrollment)
    .get("/enrolled", permit("Admin EndUser SuperAdmin"), getEnrolledCourses)
    .get("/enrolledcourses", permit("Admin EndUser SuperAdmin"), getEnrolledCourses)
    .get("/enrolledusers/:id", permit("Admin EndUser SuperAdmin"), getEnrolledUsers)
    .get("/:id", permit("Admin EndUser SuperAdmin"), getCourseData)
    .get("/", permit("Admin EndUser SuperAdmin"), getCourses)

router
    .post("/video/link", permit("Admin SuperAdmin"), addVideoToCourse)
    .delete("/video/removelink", permit("Admin SuperAdmin"), removeVideoFromCourse)
    .post("/video/upload", permit("Admin SuperAdmin"), uploadVideo)
    .get("/video/:id", permit("Admin EndUser SuperAdmin"), getVideoData)
    .get("/videos/:courseId", permit("Admin EndUser SuperAdmin"), getCourseVideos)
    .patch("/video/update/:id", permit("Admin SuperAdmin"), updateVideo)
    .delete("/video/delete/:videoId", permit("Admin SuperAdmin"), deleteVideo)

router
    .post("/exercise/link", permit("Admin SuperAdmin"), addExerciseToCourse)

module.exports = router
