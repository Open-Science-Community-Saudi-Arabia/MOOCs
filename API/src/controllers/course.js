const {
  createACourse,
  getACourse,
  allCollaboratorCourses,
  allCourses,
  approveACourse,
  updateACourse,
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

const getCollaboratorCourses = async (req, res) => {
  try {
    const collaboratorId = req.params.collaboratorId;

    const course = await allCollaboratorCourses(collaboratorId);
    return res.status(200).send({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllCourses = async (req, res) => {
  try {
    const course = await allCourses();

    const filtered = course.filter((ele) => ele.status !== "Draft");
    return res.status(200).send({
      success: true,
      data: filtered,
    });
  } catch (error) {
    console.log(error);
  }
};

const approveCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await approveACourse(courseId);

    return res.status(200).send({
      success: true,
      message: "Course Approved",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;

  const reqBody = Object.assign({}, req.body);
  const parseReqBody = JSON.parse(reqBody.body);
//  console.log(parseReqBody.coursesection[0].resources[2])

  try {
    const course = await updateACourse(courseId, parseReqBody,req.file);
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
  getCollaboratorCourses,
  approveCourse,
  updateCourse,
};
