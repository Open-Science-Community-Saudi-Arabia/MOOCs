
const router = require("express").Router();

const { createCourse, getCourses, getCourseData,
    deleteCourse, updateCourse,
    uploadVideo, getVideoData, getCourseVideos,
    updateVideo, enrollCourse, cancelEnrollment,
    getEnrolledCourses, getEnrolledUsers,
    addVideoToCourse, removeVideoFromCourse, deleteVideo } = require("../controllers/course.controllers")

const {
    createExercise, getExercises, updateExercise, 
    deleteExercise, addQuestionToExercise, removeQuestionFromExercise,
} = require("../controllers/exercise.controllers")

const permit = require("../middlewares/permission_handler")
const { basicAuth } = require("../middlewares/auth")

router.use(basicAuth())

router
    .post("/new", permit("Admin SuperAdmin"), createCourse)
    .get("/", permit("Admin EndUser SuperAdmin"), getCourses)
    .get("/:id", permit("Admin EndUser SuperAdmin"), getCourseData)
    .patch("/update/:id", permit("Admin SuperAdmin"), updateCourse)
    .delete("/delete/:id", permit("Admin SuperAdmin"), deleteCourse)
    .post("/enroll", permit("Admin EndUser SuperAdmin"), enrollCourse)
    .post("/cancelenrollment", permit("Admin EndUser SuperAdmin"), cancelEnrollment)
    .get("/enrolledcourses", permit("Admin EndUser SuperAdmin"), getEnrolledCourses)
    .get("/enrolledusers", permit("Admin EndUser SuperAdmin"), getEnrolledUsers)

router
    .post("/video/link", permit("Admin SuperAdmin"), addVideoToCourse)
    .delete("/video/removelink", permit("Admin SuperAdmin"), removeVideoFromCourse)
    .post("/video/upload", permit("Admin SuperAdmin"), uploadVideo)
    .get("/video/:id", permit("Admin EndUser SuperAdmin"), getVideoData)
    .get("/videos/:courseId", permit("Admin EndUser SuperAdmin"), getCourseVideos)
    .patch("/video/update/:id", permit("Admin SuperAdmin"), updateVideo)
    .delete("/video/delete/:videoId", permit("Admin SuperAdmin"), deleteVideo)

router 
    .post("/exercise/new", createExercise)
    .get("/exercise", getExercises)
    .patch("/exercise/update", updateExercise)
    .delete("/exercise/delete", deleteExercise)
    .post("/exercise/question/link", addQuestionToExercise)
    .delete("/exercise/question/removelink", removeQuestionFromExercise)



module.exports = router
