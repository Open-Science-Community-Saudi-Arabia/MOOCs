const { Video, Course, Exercise, Question } = require("../models/course.models")
const { v2 } = require("cloudinary")
const asyncWrapper = require("../utils/async_wrapper");
const { BadRequestError } = require("../utils/custom_errors");

/* COURSES */

exports.createCourse = asyncWrapper(
    async (req, res, next) => {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    }
)

// Get data for all course - req.body._id = null
// Get all data for a particular course - req.body._id = the id of the course you want to get data for
// Get all courses - req.body = null
exports.getCourses = asyncWrapper(
    async (req, res, next) => {
        if (req.body) {
            const courses = await Course.find(req.body)
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

exports.enrollCourse = asyncWrapper(
    async (req, res, next) => {
        const course = await Course.findById(req.body.course_id)
        const user = await User.findById(req.body.user_id)

        course.enrolled_users.push(user)
        await course.save()

        user.enrolled_courses.push(course)
        await user.save()

        res.status(200).send({ message: "user has been enrolled in course successfully" })
    }
)

exports.cancelEnrollment = asyncWrapper(
    async (req, res, next) => {
        const course = await Course.findById(req.body.course_id)
        const user = await User.findById(req.body.user_id)

        course.enrolled_users.pull(user)
        await course.save()

        user.enrolled_courses.pull(course)
        await user.save()

        res.status(200).send({ message: "user has been unenrolled from course successfully" })
    }
)

/* VIDEOS */

exports.uploadVideo = asyncWrapper(
    async (req, res, next) => {
        const { video } = req.files
        const { course_id } = req.body

        const result = await v2.uploader.upload(video.tempFilePath, {
            resource_type: "video",
            folder: "videos"
        })

        const newVideo = new Video({
            video_url: result.secure_url,
            video_id: result.public_id,
            ...req.body
            //     course: course_id,
            //     description: req.body.description,
            //     title: req.body.title,
            //     author: req.body.author
        })

        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo);
    }
)

// Get data for particular video - req.body._id = video_id
// Get data for all videos - req.body._id = null
// Get videos for a particular course - req.body.course_id = course_id
// Get all videos - req.body = null
exports.getVideo = asyncWrapper(
    async (req, res, next) => {

        const videos = await Video.find(req.body)
        res.status(200).json(videos);
    }
)

exports.updateVideo = asyncWrapper(
    async (req, res, next) => {
        const video = await Video.findById(req.params.id);

        if (video) {
            await video.updateOne({ $set: req.body });

            return res.status(200).json({ message: "Video Updated", video: video });
        }

        next(new BadRequestError("Video not found"));
    }
)

exports.deleteVideo = asyncWrapper(
    async (req, res, next) => {

        const videoId = req.params.videoId
        await Video.findByIdAndDelete(videoId)

        return res.status(200).send({ message: "video has been deleted successfully" })
    }
)
