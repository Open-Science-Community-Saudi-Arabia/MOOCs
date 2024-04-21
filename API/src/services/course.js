const { Course } = require("../models/course");
const fs = require("fs");
const { uploadToCloudinary } = require("../utils/cloudinary");
const createACourse = async (preview_image, body) => {
  const newCourse = await Course.create(body);

  const file_url = await uploadToCloudinary({
    path: preview_image.path,
    file_name: `course_preview_${newCourse._id}`,
    destination_path: "courses/preview_images",
  });

  newCourse.preview_image = file_url;
  body.coursesection.map((ele) => {
    newCourse.course_section.push({
      title: ele.title,
      description: ele.description,
      resources: ele.resources,
    });
  });

  const courseDetails = await newCourse.save();

  // console.log(courseDetails);

  // Delete file from server
  await fs.unlink(preview_image.path, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  createACourse,
};
