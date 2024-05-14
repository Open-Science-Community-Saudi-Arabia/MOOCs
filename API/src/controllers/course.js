/**
 * @category API
 * @subcategory Controllers
 * @module Course Controller
 * @description This module contains the controllers for handling course logic.
 * @requires ../services/course
 * 
 * The following routes are handled by this module and their corresponding functions: </br>
 *
 * </br>
 *
 * <b>GET</b> / - superadmin</br>
 * <b>GET</b> /approved</br>
 * <b>GET</b> /enroll/:courseId</br>
 * <b>GET</b> /:courseId - EndUser SuperAdmin</br>
 * <b>GET</b> /contributor/:contributorId - Contributor SuperAdmin</br>
 * <b>GET</b> /pending/:courseId - SuperAdmin</br>
 * <b>GET</b> /toggle-available/:courseId - SuperAdmin</br>
 * <b>GET</b> /toggle-editing/:courseId - SuperAdmin</br>
 * <b>GET</b> /archive/:courseId - Contributor SuperAdmin</br>
 * <b>POST</b> /new - Contributor SuperAdmin</br>
 * <b>POST</b> /exercise-score/:courseId </br>
 * <b>PATCH</b>/:courseId - Contributor SuperAdmin </br>
 *
 */

const {
  createACourse,
  getACourse,
  getAContributorCourses,
  allCourses,
  approveACourse,
  allApprovedCourses,
  updateACourse,
  archiveACourse,
  pendingACourse,
  enrollAUser,
  toggleAvailablity,
  toggleEditing,
  evaluateUserAnswers,
} = require("../services/course");

/**
 *
 * @description Create a new course by admin or contributor.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and message
 * @throws {Error} If error occurs
 */
const createCourse = async (req, res) => {
  try {
    const reqBody = Object.assign({}, req.body);
    const parseReqBody = JSON.parse(reqBody.body);
    const preview_image = req.file;
    if (!preview_image) {
      return next(new BadRequestError("Missing preview image"));
    }
    const userId = req.user.id;
    await createACourse(userId, preview_image, parseReqBody);
    return res.status(200).send({
      success: true,
      message: "New course created successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

/**
 *
 * @description Get a specific course. Allowed for EndUser and SuperAdmin
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and course data
 * @throws {Error} If error occurs
 */
const getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await getACourse(courseId, req.user.role);

    return res.status(200).send({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Request failed",
      error: error,
    });
  }
};

/**
 *
 * @description Get a specific contributor course. Request permitted for contributors.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and course data
 * @throws {Error} If error occurs
 */
const getContributorCourses = async (req, res) => {
  try {
    const contributorId = req.params.contributorId;

    const course = await getAContributorCourses(contributorId);
    const filtered = course.filter((ele) => ele.status !== "Archived");
    return res.status(200).send({
      success: true,
      data: filtered,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

/**
 *
 * @description Get all courses excluding contributors drafts. Request permitted for super admin only. 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and all courses data
 * @throws {Error} If error occurs
 */
const getAllCourses = async (req, res) => {
  try {
    const courses = await allCourses();

    const filtered = courses.filter((ele) => ele.status !== "Draft");
    return res.status(200).send({
      success: true,
      data: filtered,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

/**
 *
 * @description Get all approved course.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and all approved courses data
 * @throws {Error} If error occurs
 */
const getApprovedCourses = async (req, res) => {
  try {
    const courses = await allApprovedCourses();
    return res.status(200).send({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

/**
 *
 * @description Approved a course. Only Super admin can approve courses.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and message
 * @throws {Error} If error occurs
 */
const approveCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    await approveACourse(courseId);

    return res.status(200).send({
      success: true,
      message: "Course Approved",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

/**
 *
 * @description Update course status to pending. Only Super admin can update course status.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and message
 * @throws {Error} If error occurs
 */
const makeCoursePending = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    await pendingACourse(courseId);
    return res.status(200).send({
      success: true,
      message: "Course Updated",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

/**
 *
 * @description Update course status to archive. Only Super admin can update course status. 
 * Archiving a course is similar to delete but with an extended period.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and message
 * @throws {Error} If error occurs
 */
const archiveCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    await archiveACourse(courseId);

    return res.status(200).send({
      success: true,
      message: "Course Deleted",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

/**
 *
 * @description Update course. Only Super admin  and contributor can can update a course. 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and message
 * @throws {Error} If error occurs
 */
const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const reqBody = Object.assign({}, req.body);
  const parseReqBody = JSON.parse(reqBody.body);
  try {
    await updateACourse(courseId, parseReqBody, req.file);
    return res.status(200).send({
      success: true,
      message: "Course Updated",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

/**
 *
 * @description Enrolling into a course by the end user. Request permitted for end users. 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and message
 * @throws {Error} If error occurs
 */
const enrollUser = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await enrollAUser(courseId, req.user.id);

    if (course) {
      return res.status(200).send({
        success: true,
        message: "Course enrolled succesfully",
      });
    }
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
 * @description Update a course avaialbility. Only Super admin can update course availabilty. 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and message
 * @throws {Error} If error occurs
 */
const toggleCourseAvailablity = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await toggleAvailablity(courseId);
    if (course) {
      return res.status(200).send({
        success: true,
        message: "Course availablity updated",
      });
    }
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
 * @description Toggle a course editing mode. Only Super admin can update course editing status. 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and message
 * @throws {Error} If error occurs
 */
const toggleCourseEditing = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await toggleEditing(courseId);
    if (course) {
      return res.status(200).send({
        success: true,
        message: "Course editing updating",
      });
    }
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
 * @description Evaluate and check quiz score answers after the user submits selection for a course quiz.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object} - HTTP response object with success field and evaluate score for the quiz
 * @throws {Error} If error occurs
 */
const evaluateQuizScore = async (req, res) => {
  const quizPayload = req.body;

  const courseId = req.params.courseId;
  try {
    const score = await evaluateUserAnswers(req.user.id, courseId, quizPayload);

    return res.status(200).json({
      success: true,
      score: score,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Request failed",
    });
  }
};

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  getContributorCourses,
  approveCourse,
  updateCourse,
  archiveCourse,
  getApprovedCourses,
  makeCoursePending,
  enrollUser,
  toggleCourseAvailablity,
  toggleCourseEditing,
  evaluateQuizScore,
};
