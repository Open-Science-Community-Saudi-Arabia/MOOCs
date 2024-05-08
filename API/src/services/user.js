const { User } = require("../models/user.models");

const getScore = async (userId, courseId) => {
  const user = await User.findById(userId);
  const scoreArray = user.quizScore.filter((ele) => ele.courseId == courseId);
  const sum = scoreArray.reduce((acc, o) => acc + o.score, 0);
  const overallScore = sum / user.quizScore.length;
  return overallScore;
};


const getAUserCourse = async (userId, courseId) => {
  const userCourses = await User.findById(userId)
    .lean()
    .select("quizScore enrolledcourse")
    .populate("enrolledcourse");

  const userCourse = userCourses.enrolledcourse.find((course) =>
    course._id.equals(courseId)
  );

  let course_section = userCourse.course_section.map((course) => {
    let resources = course.resources.map((ele) => {
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
    return { ...course, resources };
  });

  const userQuizScore = userCourses.quizScore.filter(
    (ele) => ele.courseId == courseId
  );
  const course = { ...userCourse, course_section };
  return { ...course, quizScore: userQuizScore };
};

module.exports = {
  getScore,
  getAUserCourse,
};
