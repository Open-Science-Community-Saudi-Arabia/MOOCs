const router = require("express").Router();

const { getUserOverAllScore } = require("../controllers/user");
const { basicAuth } = require("../middlewares/auth");

router.use(basicAuth());
router.get("/overall-score/:courseId", getUserOverAllScore);

module.exports = router;
