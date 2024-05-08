const { Course } = require("../models/course");
const { User } = require("../models/user.models");

const getScore = async (userId, courseId) => {
  const user = await User.findById(userId);
  const scoreArray = user.quizScore.filter((ele) => ele.courseId == courseId);
  const sum = scoreArray.reduce((acc, o) => acc + o.score, 0);
  const overallScore = sum / user.quizScore.length;
  return overallScore;
};

const getAUserCourse = async (userId, courseId) => {
  const course = await Course.findById(courseId).lean();

  let course_section = course.course_section.map((coursesection) => {
    let resources = coursesection.resources.map((ele) => {
      if (ele.type === "quiz") {
        let newQuiz = ele.quiz.map((item) => {
          return (item = {
            _id: item._id,
            options: item.options,
            question: item.question,
          });
        });
        return { ...ele, quiz: newQuiz };
      }
      return ele;
    });
    return { ...coursesection, resources };
  });
  const courseinfo = { ...course, course_section };

  const user = await User.findById(userId);
  const userQuizScore = user.quizScore.filter(
    (ele) => ele.courseId == courseId
  );

  return { ...courseinfo, quizScore: userQuizScore };
};

module.exports = {
  getScore,
  getAUserCourse,
};
