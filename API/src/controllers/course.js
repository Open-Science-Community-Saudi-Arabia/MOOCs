const { createACourse } = require("../services/course");

const createCourse = async (req, res) => {
  try {
    const reqBody = Object.assign({}, req.body);
    const parseReqBody = JSON.parse(reqBody.body);
    const preview_image = req.file;
    if (!preview_image) {
      return next(new BadRequestError("Missing preview image"));
    }
    //handle pdf too
    // map parse data to save only link to pdf
    const course = await createACourse(preview_image, parseReqBody);
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  createCourse,
};
