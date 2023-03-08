const {
    Video,
    Course,
    Exercise,
    Question,
} = require("../models/course.models");
const { v2 } = require("cloudinary");
const asyncWrapper = require("../utils/async_wrapper");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const { User } = require("../models/user.models");

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

    // Get all available courses
    const courses = (
        await Course.find().populate('videos exercises').sort({ _id: -1 })
    ).filter((course) => {
        if (course.isAvailable) return course.toJSON();
    });

    return res.status(200).send({
        success: true,
        data: {
            courses
        }
    });
};

/**
 * Get course data
 * Gets all the content of a course, including videos,
 * author, description
 * 
 * @param {string} id - id of the course 
 * 
 * @returns course
 */
exports.getCourseData = async (req, res, next) => {
    if (!req.params.id || req.params.id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const course = await Course.findById(req.params.id).populate('exercises');

    return res.status(200).send({
        success: true,
        data: {
            message: "Success",
            course: course.isAvailable ? course.toJSON() : null
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
    await Course.findByIdAndUpdate(courseId, { isAvailable: false });

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
 * @param {string} id - id of course to enroll for 
 * 
 * @returns {string} message
 * 
 * @throws {error} if an error occured
 * @throws {BadRequestError} If course id not in request params
 * @throws {NotFoundError} if Course not found
 */
exports.enrollCourse = async (req, res, next) => {
    const course_id = req.params.id

    if (!course_id || course_id == ':id') {
        return next(new BadRequestError("Missing param `id` in request params"))
    }

    const course = await Course.findByIdAndUpdate(
        course_id,
        {
            $addToSet: {
                enrolled_users: req.user.id
            }

        }, { new: true })

    // Check if course exists
    if (!course) {
        return next(new NotFoundError("Course not found"))
    }

    return res.status(200).send({
        success: true,
        data: {
            message: "Enrollment successful",
        }
    });
};

/**
 * Cancel course enrollment 
 * 
 * @param {string} id - course id
 * 
 * @returns {string} message
 * 
 * @throws {BadRequestError} If missing id in request parameter
 * @throws {NotFoundError} If course not found
 */
exports.cancelEnrollment = async (req, res, next) => {
    const course_id = req.params.id

    if (!course_id || course_id == ':id') {
        return next(new BadRequestError("Missing param `id` in request params"))
    }

    const course = await Course.findByIdAndUpdate(
        course_id,
        { $pull: { enrolled_users: req.user.id } },
        { new: true })

    // Check if course exists
    if (!course) {
        return next(new NotFoundError("Course not found"))
    }

    return res.status(200).send({
        success: true,
        data: {
            message: "Enrollment cancelled successfully",
        }
    });
};

/**
 * Get enrolled courses for a particular user
 * 
 * @returns {object} enrolledCourses 
 */
exports.getEnrolledCourses = async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('enrolled_courses');

    return res.status(200).send({
        success: true,
        data: {
            enrolled_courses: user.toObject().enrolled_courses
        }
    })
};

/**
 * Get Enrolled users 
 * 
 * @param {id} - course id
 * 
 * @returns {object} enrolled_users
 * 
 * @throws {BadRequestError} If missing id in request parameter
 * @throws {NotFoundError} If course not found
 */
exports.getEnrolledUsers = async (req, res, next) => {
    const course_id = req.params.id

    if (!course_id || course_id == ':id') {
        return next(new BadRequestError("Missing param `id` in request params"))
    }

    const course = await Course.findById(course_id).populate('enrolled_users')

    // Check if course exists
    if (!course) {
        return next(new NotFoundError("Course not found"))
    }

    return res.status(200).send({ 
        success: true,
        data: {
            enrolled_users: course.enrolled_users
        }
     });
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
exports.uploadVideo = async (req, res, next) => {
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
}

/**
 * Add vidoe to course
 * 
 * @param {string} video_id - id of the video 
 * @param {string} course_id - id of the course to add the video
 * 
 * @returns {Object} course 
 */
exports.addVideoToCourse = async (req, res, next) => {
    const { video_id, course_id } = req.body

    const course = await Course.findByIdAndUpdate(
        course_id,
        { $addToSet: { videos: video_id } },
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

/**
 * Remove vidoe from course
 * 
 * @param {string} video_id - id of the video 
 * @param {string} course_id - id of the course 
 * 
 * @returns {Object} course 
 */
exports.removeVideoFromCourse = async (req, res, next) => {
    const { video_id, course_id } = req.body

    const course = await Course.findByIdAndUpdate(
        course_id,
        { $pull: { videos: video_id } },
        { new: true }).populate('videos').populate('')

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

/**
 * Get Course videos
 * Gets all the videos linked to a particular course
 * 
 * @param {courseId} - id of the course to get 
 *  
 * @returns {Array} - Array of all the videos within the course
 */
exports.getCourseVideos = async (req, res, next) => {
    if (!req.params.courseId || req.params.id == ':courseId') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const courseId = req.params.courseId;
    const course_videos = await Course.findById(courseId).populate('videos');

    // Remove unavailable videos
    course_videos.videos = course_videos.videos.filter((video) => video.isAvailable)

    return res.status(200).send({
        success: true,
        data: {
            course_videos
        }
    })
}

/**
 * Get video data
 * 
 * @param {string} id - id of the video 
 * 
 * @returns {Object} video 
 */
exports.getVideoData = async (req, res, next) => {
    if (!req.params.id || req.params.id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const videoId = req.params.id;
    const video = await Video.findById(videoId).populate('course')

    return res.status(200).send({
        success: true,
        data: {
            video: video.isAvailable ? video : null // check if video is available
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
exports.updateVideo = async (req, res, next) => {
    const video = await Video.findById(req.params.id);

    if (video) {
        await video.updateOne({ $set: req.body });

        return res.status(200).json({ message: "Video Updated", video: video });
    }

    next(new BadRequestError("Video not found"));
}

/**
 * Delete video
 * 
 * Doesn't actually delete the video, it only updates its available status
 * if a videos `isAvailable` status is set to false, it wont be added when making requests
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
exports.deleteVideo = async (req, res, next) => {
    const videoId = req.params.videoId;
    await Video.findByIdAndUpdate(videoId, { isAvailable: false });

    return res
        .status(200)
        .send({
            success: true,
            data: {
                message: "video has been deleted successfully"
            }
        });
}

// Add a question to an exercise
/**
 * Add question to exercise
 * 
 * @param {string} exercise_id
 * @param {string} question_id
 * 
 * @returns {string} message
 * 
 * @throws {error} if an error occured
 * @throws {NotFoundError} if Exercise not found
 * @throws {NotFoundError} if Course not found
 * */
exports.addExerciseToCourse = async (req, res, next) => {
    const { exercise_id, course_id } = req.body
    const course = await Course.findById(course_id)

    if (!course) {
        return next(new NotFoundError("Course not found"))
    }

    const exercise = await Exercise.findByIdAndUpdate(exercise_id, { course: course_id })
    if (!exercise) {
        return next(new NotFoundError("Exercise not found"))
    }

    return res.status(200).send({
        success: true,
        data: {
            message: "Exercise has been added to course",
            exercise
        }
    })
}