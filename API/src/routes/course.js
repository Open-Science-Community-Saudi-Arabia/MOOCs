const router = require("express").Router();

const {
  createCourse,
  getCourse,
  getAllCourses,
  getCollaboratorCourses,
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
  .get("/courseId", permit("EndUser SuperAdmin"), getCourse)
  .get("/contributorId", permit("Admin SuperAdmin"), getCollaboratorCourses)
  .get("/", permit("Admin SuperAdmin"), getAllCourses);

module.exports = router;
