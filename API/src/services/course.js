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

  // body.coursesection.map((ele) => {
  //   newCourse.course_section.push({
  //     title: ele.title,
  //     description: ele.description,
  //     resources: ele.resources,
  //   });
  // });
  
  newCourse.course_section = body.coursesection;
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
  return course;
};

const allCourses = async () => {
  const course = await Course.find().populate({
    path: "createdBy",
  });
  return course;
};

const approveACourse = async (courseId) => {
  const course = await Course.findById(courseId);
  course.status = "Approved";
  await course.save();
  return course;
};

const updateACourse = async (courseId, body, preview_image) => {
  // console.log(preview_image);
  let file_url;
  if (preview_image !== undefined) {
    file_url = await uploadToCloudinary({
      path: preview_image.path,
      file_name: `course_preview_${courseId}`,
      destination_path: "courses/preview_images",
    });
  }
  const course = await Course.findById(courseId);
  console.log(body.coursesection[0]);
  course.preview_image =
    preview_image !== undefined ? file_url : course.preview_image;
  course.title = body.title;
  course.description = body.description;
  course.author = body.author;
  course.course_section = body.coursesection;

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

module.exports = {
  createACourse,
  getACourse,
  allCollaboratorCourses,
  allCourses,
  approveACourse,
  updateACourse,
};
