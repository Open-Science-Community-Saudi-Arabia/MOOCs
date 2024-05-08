const { getScore ,getAUserCourse} = require("../services/user");

const getUserOverAllScore = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const overallScore = await getScore(req.user.id, courseId);
    return res.status(200).json({
      success: true,
      score: overallScore,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

const getUserCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await getAUserCourse(req.user.id, courseId);

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

module.exports = {
  getUserOverAllScore,
  getUserCourse
};

