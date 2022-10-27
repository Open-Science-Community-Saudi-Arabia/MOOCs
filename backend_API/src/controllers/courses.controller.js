const { Video, Course, Exercise, Question } = require("../models/course.models")
const { v2 } = require("cloudinary")
const asyncWrapper = require("../utils/async_wrapper");
const { BadRequestError } = require("../utils/custom_errors");

exports.createCourse = asyncWrapper(
    async (req, res, next) => {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    }
)

exports.getCourses = asyncWrapper(
    async (req, res, next) => {
        if (req.body.query) {
            const courses = await Course.find(query)
            res.status(200).json(courses);
        }
        const courses = await Course.find().sort({ _id: -1 })

        return res.status(200).send({ courses: courses })
    }
)

exports.updateCourse = asyncWrapper(
    async (req, res, next) => {
        const course = await Course.findById(req.params.id);

        if (course) {
            await course.updateOne({ $set: req.body });

            return res.status(200).json({ message: "Course Updated", course: course });
        }

        next(new BadRequestError("Course not found"));
    }
)

exports.deleteCourse = asyncWrapper(
    async (req, res, next) => {

        const courseId = req.params.courseId
        await Course.findByIdAndDelete(courseId)

        res.status(200).send({ message: "course has been deleted successfully" })
    }
)
