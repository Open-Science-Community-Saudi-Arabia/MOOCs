const router = require("express").Router();

const {
  createCourse,
  getCourse,
  getAllCourses,
  getCollaboratorCourses,
  approveCourse,
  updateCourse
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
  .post("/new", permit("Admin SuperAdmin"), upload.single("file"), createCourse)
  .get("/:courseId", permit("EndUser SuperAdmin"), getCourse)
  .get("/contributor/:collaboratorId", permit("Admin SuperAdmin"), getCollaboratorCourses)
  .get("/", permit("SuperAdmin"), getAllCourses)
  .get("/approve/:courseId", permit("SuperAdmin"), approveCourse)
  .patch("/:courseId", permit("Admin SuperAdmin"),upload.single("file"),updateCourse);

module.exports = router;
