const { createACourse, getACourse, allCollaboratorCourses,allCourses } = require("../services/course");

const createCourse = async (req, res) => {
  console.log(req.user);
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
      message: "New course created succuessfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await getACourse(courseId);
    return res.status(200).send({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
  }
};

const   getCollaboratorCourses = async (req, res) => {
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
    return res.status(200).send({
      success: true,
      data: course,
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
};
