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
  getAUserCourse
} = require("../services/course");

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

const getUserCourse = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    const course = await getAUserCourse(userId, courseId);
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

const enrollUser = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const user = await enrollAUser(courseId, req.user.id);

    if (user) {
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

const evaluateQuizScore = async (req, res) => {
  const quizPayload = req.body;
  const userId = req.params.userId;
  const courseId = req.params.courseId;
  try {
    const score = await evaluateUserAnswers(userId, courseId, quizPayload);

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
  getUserCourse
};
