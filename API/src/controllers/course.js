const {
  createACourse,
  getACourse,
  getAContributorCourses,
  allCourses,
  approveACourse,
  allApprovedCourses,
  updateACourse,
  archiveACourse,
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
    console.log(error);
  }
};

const getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await getACourse(courseId);
    const filtered = course.filter((ele) => ele.status !== "Draft");
    return res.status(200).send({
      success: true,
      data: filtered,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
};
