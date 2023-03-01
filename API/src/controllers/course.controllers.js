const {
    Video,
    Course,
    Exercise,
    Question,
} = require("../models/course.models");
const { v2 } = require("cloudinary");
const asyncWrapper = require("../utils/async_wrapper");
const { BadRequestError } = require("../utils/errors");
const User = require("../models/user.models");

/* COURSES */

/**
 * Create new course
 * 
 * @param {string} title - Course title
 * @param {string} author - Course author
 * @param {string} description - Course description
 * 
 * @returns {MongooseObject} savedCourse
 * 
 * @throws {error} if an error occured
 */
exports.createCourse = async (req, res, next) => {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    return res.status(200).json({
        success: true,
        data: {
            course: savedCourse
        }
    });
};

/**
 * Get courses
 * 
 * To get data for all course set req.body._id = null
 * To get data for a particular course set req.body._id - id of the course
 * To get data for all courses set req.body = null
 * 
 * @param {string} id - Course id
 * 
 * @returns {object} courses
 **/
exports.getCourses = async (req, res, next) => {
    if (Object.keys(req.body).length != 0) {
        const courses = await Course.find(req.body);
        return res.status(200).json(courses);
    }
    const courses = await Course.find().sort({ _id: -1 });

    return res.status(200).send({
        success: true,
        data: {
            courses
        }
    });
};

exports.getCourseData = async (req, res, next) => {
    if (!req.params.id || req.params.id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const course = await Course.findById(req.params.id);

    return res.status(200).send({
        success: true,
        data: {
            message: "Success",
            course
        }
    })
}

/**
 * Update course data
 * 
 * @private
 * 
 * @param {string} id
 * 
 * @returns {string} message
 * @returns {object} course
 * 
 * @throws {BadRequestError} if Course not found
 */
exports.updateCourse = async (req, res, next) => {
    if (!req.params.id || req.params.id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const course = await Course.findById(req.params.id);

    if (course) {
        await course.updateOne({ $set: req.body });

        return res.status(200).json({
            success: true,
            data: {
                message: "Course Updated",
                updated_course: course
            }
        })
    };

    return next(new BadRequestError("Course not found"));
}

/** 
 * Delete course
 * 
 * @private 
 * 
 * @param {string} id - Id of the course
 * 
 * @returns {string} message
 */
exports.deleteCourse = async (req, res, next) => {
    if (!req.params.id || req.params.id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const courseId = req.params.id;
    await Course.findByIdAndDelete(courseId);

    return res.status(200).send({
        success: true,
        data: {
            message: "course has been deleted successfully"
        }
    });
};

/**
 * Enroll for a course
 * 
 * @private
 * 
 * @param {string} course_id - id of course to enroll for 
 * @param {string} user_id - id of user to enroll
 * 
 * @returns {string} message
 * 
 * @throws {error} if an error occured
 */
exports.enrollCourse = async (req, res, next) => {
    const course = await Course.findById(req.body.course_id);
    const user = await User.findById(req.body.user_id);

    course.enrolled_users.push(user);
    await course.save();

    user.enrolled_courses.push(course);
    await user.save();

    res
        .status(200)
        .send({ message: "user has been enrolled in course successfully" });
};

/**
 * Cancel course enrollment 
 * 
 * @param {string} course_id
 * @param {string} user_id
 * 
 * @returns {string} message
 */
exports.cancelEnrollment = async (req, res, next) => {
    const course = await Course.findById(req.body.course_id);
    const user = await User.findById(req.body.user_id);

    course.enrolled_users.pull(user);
    await course.save();

    user.enrolled_courses.pull(course);
    await user.save();

    res
        .status(200)
        .send({ message: "user has been unenrolled from course successfully" });
};

/**
 * Get enrolled courses for a particular user
 * 
 * @param {string} user_id
 * 
 * @returns {object} enrolledCourses 
 */
exports.getEnrolledCourses = async (req, res, next) => {
    const user = await User.findById(req.body.user_id);
    const enrolledCourses = await Course.find({
        _id: { $in: user.enrolled_courses },
    });

    return res.status(200).send({ enrolledCourses: enrolledCourses });
};

/**
 * Get Enrolled users 
 * 
 * @param {string} course_id
 * 
 * @returns {object} enrolledUsers
 */
exports.getEnrolledUsers = async (req, res, next) => {
    const course = await Course.findById(req.body.course_id);
    const enrolledUsers = await User.find({
        _id: { $in: course.enrolled_users },
    });

    return res.status(200).send({ enrolledUsers: enrolledUsers });
};

/* VIDEOS */

/**
 * Upload video
 * 
 * @param {string} title
 * @param {string} description
 * @param {string} author
 * @param {string} duration | 00:00
 * @param {string} category 
 * @param {string} course  id of course to add video to
 * 
 * @returns {object} video
 * 
 * @throws {error} if an error occured
 */
exports.uploadVideo = asyncWrapper(async (req, res, next) => {
    const { title, author,
        video_url, description,
        duration, category, course } = req.body;

    const video = await Video.create({
        title, author, video_url, description,
        duration, category, course
    });

    return res.status(200).json({
        success: true,
        data: {
            video
        }
    });
});

exports.addVideoToCourse = async (req, res, next) => {
    console.log(req.body)
    const { video_id, course_id } = req.body

    const course = await Course.findByIdAndUpdate(
        course_id,
        { $push: { videos: video_id } },
        { new: true }).populate('videos')

    return res.status(200).send({
        success: true,
        data: {
            message: 'Success',
            data: {
                course
            }
        }
    })
}

exports.getCourseVideos = asyncWrapper(async (req, res, next) => {
    if (!req.params.courseId || req.params.id == ':courseId') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const courseId = req.params.courseId;
    const course_videos = await Course.findById(courseId).populate('videos');

    return res.status(200).send({
        success: true,
        data: {
            course_videos
        }
    })
});

exports.getVideoData = async (req, res, next) => {
    if (!req.params.id || req.params.id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const videoId = req.params.id;
    const video = await Video.findById(videoId).populate('course')

    return res.status(200).send({
        success: true,
        data: {
            video
        }
    })
}

/**
 * Update video data
 * 
 * @param {string} video_id
 * @param {object} req.body
 * 
 * @returns {object} video
 * 
 * @throws {error} if an error occured
 * @throws {BadRequestError} if video not found
 */
exports.updateVideo = asyncWrapper(async (req, res, next) => {
    const video = await Video.findById(req.params.id);

    if (video) {
        await video.updateOne({ $set: req.body });

        return res.status(200).json({ message: "Video Updated", video: video });
    }

    next(new BadRequestError("Video not found"));
});

/**
 * Delete video
 * 
 * @param {string} video_id
 * 
 * @returns {string} message
 * 
 * @throws {error} if an error occured
 * @throws {BadRequestError} if video not found
 * 
 * @todo delete video from cloudinary
 * @todo delete video from database
 * @todo delete video from course
 * @todo delete video from user
 * */
exports.deleteVideo = asyncWrapper(async (req, res, next) => {
    const videoId = req.params.videoId;
    await Video.findByIdAndDelete(videoId);

    return res
        .status(200)
        .send({ message: "video has been deleted successfully" });
});
