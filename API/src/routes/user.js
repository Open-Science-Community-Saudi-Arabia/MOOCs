const router = require("express").Router();

const { getUserOverAllScore, getUserCourse } = require("../controllers/user");
const { basicAuth } = require("../middlewares/auth");
const { redisCacheMiddleware } = require("../middlewares/redis");

router.use(basicAuth());
router.get("/overall-score/:courseId", getUserOverAllScore);
router.get("/course/:courseId", redisCacheMiddleware(), getUserCourse);
module.exports = router;
