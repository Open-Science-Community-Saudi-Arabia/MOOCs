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

router.get("/", permit("SuperAdmin"), getAllCourses);
router.get("/approved", getApprovedCourses);
router.get("/enroll/:courseId", enrollUser);

router.get("/:courseId", permit("EndUser SuperAdmin"), getCourse);
router.get(
  "/contributor/:contributorId",
  permit("Contributor SuperAdmin"),
  getContributorCourses
);

router.get("/pending/:courseId", permit("SuperAdmin"), makeCoursePending);
router.get("/approve/:courseId", permit("SuperAdmin"), approveCourse);
router.get(
  "/toggle-available/:courseId",
  permit("SuperAdmin"),
  toggleCourseAvailablity
);
router.get(
  "/toggle-editing/:courseId",
  permit("SuperAdmin"),
  toggleCourseEditing
);

router.get(
  "/archive/:courseId",
  permit("Contributor SuperAdmin"),
  archiveCourse
);

router.post(
  "/new",
  permit("Contributor SuperAdmin"),
  upload.single("file"),
  createCourse
);
router.post("/exercise-score/:courseId", evaluateQuizScore);
router.patch(
  "/:courseId",
  permit("Contributor SuperAdmin"),
  upload.single("file"),
  updateCourse
);

module.exports = router;
