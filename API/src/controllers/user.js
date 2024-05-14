/**
 * @category API
 * @subcategory Controllers
 * @module User Controller
 * @description This module contains the controllers for handling user logic.
 *
 * The following routes are handled by this module and their corresponding functions: </br>
 *
 * </br>
 *
 * <b>GET</b> /overall-score/:courseId </br>
 * <b>GET</b> /course/:courseId</br>
 *
 */

const { getScore, getAUserCourse } = require("../services/user");

/**
 *
 * @description The user overall score for an enrollled course.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and score
 */

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

/**
 *
 * @description The user enrollled course.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and course
 */
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
  getUserCourse,
};
