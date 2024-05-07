const { User } = require("../models/user.models");

const getScore = async (userId, courseId) => {
  const user = await User.findById(userId);
  const scoreArray = user.quizScore.filter((ele) => ele.courseId == courseId);

  const sum = scoreArray.reduce((acc, o) => acc + o.score, 0);

  return sum;
};

module.exports = {
  getScore,
};
