const { Course } = require("../models/course");
const fs = require("fs");
const { uploadToCloudinary } = require("../utils/cloudinary");

const createACourse = async (userId, preview_image, body) => {
  const newCourse = await Course.create(body);

  const file_url = await uploadToCloudinary({
    path: preview_image.path,
    file_name: `course_preview_${newCourse._id}`,
    destination_path: "courses/preview_images",
  });

  newCourse.preview_image = file_url;
  newCourse.createdBy = userId;

  body.coursesection.map((ele) => {
    newCourse.course_section.push({
      title: ele.title,
      description: ele.description,
      resources: ele.resources,
    });
  });

  const courseDetails = await newCourse.save();

  await fs.unlink(preview_image.path, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return courseDetails;
};

const getACourse = async (courseId) => {
  const course = await Course.findById(courseId);
  return course;
};

const allCollaboratorCourses = async (collaboratorId) => {
  const course = await Course.find({ createdBy: collaboratorId });
  console.log(course);
  return course;
};

const allCourses = async () => {
  const course = await Course.findOne();
  return course;
};

module.exports = {
  createACourse,
  getACourse,
  allCollaboratorCourses,
  allCourses,
};
