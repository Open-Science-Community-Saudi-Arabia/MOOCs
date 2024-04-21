const router = require("express").Router();

const { createCourse } = require("../controllers/course");

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

router.post(
  "/new",
  permit("Admin SuperAdmin"),
  upload.single("file"),
  createCourse
);

module.exports = router;
