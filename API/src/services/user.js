/**
 * @category API
 * @subcategory Services
 * @module UserService
 * @description The service module for handling user logic.
 *
 */

const { Course } = require("../models/course");
const { User } = require("../models/user.models");

/**
 *
 * @description Get the user overall score for an enrollled course. <br/>
 * The overall score is computed from all quiz score divided by total course quiz
 * @param {string} userId - The Id of the user.
 * @param {string} courseId - The enrolled Course Id.
 * @returns {number} - The overall quiz score of the user
 */
const getScore = async (userId, courseId) => {
  const user = await User.findById(userId);
  const course = await Course.findById(courseId);
  let totalQuizSore = [];

  course.course_section.map((coursesection) => {
    coursesection.resources.map((ele) => {
      if (ele.type === "quiz") {
        totalQuizSore.push(ele._id);
      }
    });
  });
  const scoreArray = user.quizScore.filter((ele) => ele.courseId == courseId);
  const sum = scoreArray.reduce((acc, o) => acc + o.score, 0);
  const overallScore = sum / totalQuizSore.length;
  return overallScore;
};

/**
 *
 * @description Get a user's enrolled course. <br/>
 * @param {string} userId - The Id of the user.
 * @param {string} courseId- The enrolled Course Id.
 * @returns {object} - The user's enrolled course and it's quiz score
 */
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
