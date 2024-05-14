const router = require("express").Router();

const { getUserOverAllScore, getUserCourse } = require("../controllers/user");
const { basicAuth } = require("../middlewares/auth");

router.use(basicAuth());
router.get("/overall-score/:courseId", getUserOverAllScore);
router.get("/course/:courseId", getUserCourse);
module.exports = router;
