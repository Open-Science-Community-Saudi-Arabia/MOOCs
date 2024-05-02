const router = require("express").Router();

const {
  createCourse,
  getCourse,
  getAllCourses,
  getContributorCourses,
  approveCourse,
  updateCourse,
  archiveCourse,
  getApprovedCourses,
  makeCoursePending,
  enrollUser,
  toggleCourseAvailablity,
  toggleCourseEditing,
  evaluateQuizScore,
  getUserCourse
} = require("../controllers/course");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "src/assets/tempfiles/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const permit = require("../middlewares/permission_handler");
const { basicAuth } = require("../middlewares/auth");

router.use(basicAuth());

router
  .post(
    "/new",
    permit("Contributor SuperAdmin"),
    upload.single("file"),
    createCourse
  )
  .get(
    "/approved",
    permit("EndUser Contributor SuperAdmin"),
    getApprovedCourses
  )
  .get("/:courseId", permit("EndUser SuperAdmin"), getCourse)
  .get(
    "/contributor/:contributorId",
    permit("Contributor SuperAdmin"),
    getContributorCourses
  )
  .get("/", permit("SuperAdmin"), getAllCourses)
  .get("/:userId/:courseId", getUserCourse)
  .get("/pending/:courseId", permit("SuperAdmin"), makeCoursePending)
  .get("/approve/:courseId", permit("SuperAdmin"), approveCourse)
  .get(
    "/toggle-available/:courseId",
    permit("SuperAdmin"),
    toggleCourseAvailablity
  )
  .get("/toggle-editing/:courseId", permit("SuperAdmin"), toggleCourseEditing)

  .get("/archive/:courseId", permit("Contributor SuperAdmin"), archiveCourse)
  .get("/enroll/:courseId", enrollUser)
  .post("/exercise-score/:userId/:courseId", evaluateQuizScore)
  .patch(
    "/:courseId",
    permit("Contributor SuperAdmin"),
    upload.single("file"),
    updateCourse
  );

module.exports = router;
