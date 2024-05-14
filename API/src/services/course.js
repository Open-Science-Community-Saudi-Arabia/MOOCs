/**
 * @category API
 * @subcategory Services
 * @module CourseService
 * @description The service module for handling course logic.
 * @requires ../models/course
 * @requires ../models/user.models
 * @requires .../utils/cloudinary
 *
 */

const { Course } = require("../models/course");
const { User } = require("../models/user.models");
const fs = require("fs");
const { uploadToCloudinary } = require("../utils/cloudinary");

/**
 *
 * @description Create a new course by admin or contributor. PDFs and image are upload on clodinary.
 * @param {string} userId - UserId.
 * @param {object} preview_image - Preview image .
 * @param {object} reqBody - The HTTP request body object.
 * @returns {Object} - New created course details
 */
const createACourse = async (userId, preview_image, body) => {
  const newCourse = await Course.create(body);

  const file_url = await uploadToCloudinary({
    path: preview_image.path,
    file_name: `preview_image_${newCourse._id}`,
    destination_path: `moocs_resources/${newCourse.title}`,
  });

  newCourse.preview_image = file_url;
  newCourse.createdBy = userId;
  newCourse.course_section = body.coursesection;
  const courseDetails = await newCourse.save();

  await fs.unlink(preview_image.path, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return courseDetails;
};

/**
 *
 * @description Query database for a specific course with course ID
 * @param {string} courseId - Course Id
 * @returns {Object} - Course details retrived
 */
const getACourse = async (courseId) => {
  const course = await Course.findById(courseId);
  return course;
};

/**
 *
 * @description Query database for a specific contributor courses
 * @param {string} contributorId - contributorId
 * @returns {Object} - Course details retrived
 */
const getAContributorCourses = async (contributorId) => {
  const course = await Course.find({ createdBy: contributorId });
  return course;
};

/**
 *
 * @description Query database for all courses.
 * @returns {Object} - Course details retrived
 */
const allCourses = async () => {
  const course = await Course.find().populate({
    path: "createdBy",
  });
  return course;
};

/**
 *
 * @description Query database for all course with status approved
 * @returns {Object} - Course details retrived
 */
const allApprovedCourses = async () => {
  const courses = await Course.find({ status: "Approved" }).select(
    "-course_section"
  );
  return courses;
};

/**
 *
 * @description Query database and update course status to approved
 * @param {string} courseId - Course Id
 * @returns {Object} - Course details retrived
 */
const approveACourse = async (courseId) => {
  const course = await Course.findById(courseId);
  course.status = "Approved";
  await course.save();
  return course;
};

/**
 *
 * @description Query database and update course status to pending
 * @param {string} courseId - Course Id
 * @returns {Object} - Course details retrived
 */
const pendingACourse = async (courseId) => {
  const course = await Course.findById(courseId);
  course.status = "Pending";
  await course.save();
  return course;
};

/**
 *
 * @description Query database and update course status to archived
 * @param {string} courseId - Course Id
 * @returns {Object} - Course details retrived
 */
const archiveACourse = async (courseId) => {
  const course = await Course.findById(courseId);
  course.status = "Archived";
  await course.save();
  return course;
};

/**
 *
 * @description Query database and update a course
 * @param {string} courseId - Course Id
 * @param {object} reqbody - Request body object
 * @param {object} preview_image - Curse Preview image
 * @returns {Object} - Course details retrived
 */
const updateACourse = async (courseId, body, preview_image) => {
  let file_url;
  if (preview_image !== undefined) {
    file_url = await uploadToCloudinary({
      path: preview_image.path,
      file_name: `course_preview_${courseId}`,
      destination_path: "courses/preview_images",
    });
  }
  const course = await Course.findById(courseId);

  course.preview_image =
    preview_image !== undefined ? file_url : course.preview_image;
  course.title = body.title;
  course.description = body.description;
  course.author = body.author;
  course.course_section = body.coursesection;
  course.status = body.status;

  const courseDetails = await course.save();
  if (preview_image !== undefined) {
    await fs.unlink(preview_image.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  return courseDetails;
};

/**
 *
 * @description Enroll a user into a particular course
 * @param {string} courseId - Course Id
 * @param {string} userId - User Id
 * @returns {Object} - Course details retrived
 */
const enrollAUser = async (courseId, userId) => {
  const course = await Course.findById(courseId);
  course.enrolled_users.push(userId);
  await course.save();
  return course;
};

/**
 *
 * @description Query database and toggle course availability
 * @param {string} courseId - Course Id
 * @returns {Object} - Course details retrived
 */
const toggleAvailablity = async (courseId) => {
  const course = await Course.findById(courseId);
  course.isAvailable = !course.isAvailable;
  await course.save();
  return course;
};

/**
 *
 * @description Query database and toggle course editing mode
 * @param {string} courseId - Course Id
 * @returns {Object} - Course details retrived
 */
const toggleEditing = async (courseId) => {
  const course = await Course.findById(courseId);
  course.enableEditing = !course.enableEditing;
  await course.save();
  return course;
};

/**
 *
 * @description Evaluate quiz submission , check quiz answers and update the database for a user
 * @param {string} userId - User Id
 * @param {string} courseId - Course Id
 * @returns {Object} - Quiz score details
 */
const evaluateUserAnswers = async (userId, courseId, quizPayload) => {
  const { resourceId, quizAnswers } = quizPayload;

  const course = await Course.findById(courseId);
  let quizAnswer = [...quizAnswers];

  course.course_section.map((coursesection) => {
    coursesection.resources.map((ele) => {
      if (ele._id == resourceId) {
        ele.quiz.map((item, index) => {
          if (item._id == quizAnswer[index]._id) {
            quizAnswer[index].answer === item.correctanswer
              ? (quizAnswer[index].correct = true)
              : (quizAnswer[index].correct = false);
          }
        });
      }
    });
  });

  const currentScore =
    (quizAnswer.filter((obj) => obj.correct === true).length /
      quizAnswer.length) *
    100;

  const user = await User.findById(userId);

  const courseQuiz = {
    quizId: resourceId,
    courseId,
    score: currentScore,
  };

  let array = [...user.quizScore];

  const elem = array.find(({ quizId }) => quizId === resourceId);
  if (elem) {
    elem.score = elem.score > currentScore ? elem.score : currentScore;
  } else {
    array.push(courseQuiz);
  }

  await User.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        quizScore: array,
      },
    },
    { upsert: true }
  );
  return { currentScore, quizScore: user.quizScore };
};

module.exports = {
  createACourse,
  getACourse,
  getAContributorCourses,
  allCourses,
  approveACourse,
  updateACourse,
  allApprovedCourses,
  archiveACourse,
  pendingACourse,
  enrollAUser,
  toggleAvailablity,
  toggleEditing,
  evaluateUserAnswers,
};
