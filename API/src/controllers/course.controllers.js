/**
 * @memberof Controllers
 * @name Controllers/Course
 * @module Controllers/Course
 * 
 * @description This module contains all the controllers for the course model.
 * 
 * The following routes are handled by this controller </br>
 * 
 * </br> 
 * 
 * <b>GET</b> /courses </br>
 * <b>GET</b> /courses/:id </br>
 * <b>POST</b> /courses/new </br>
 * <b>PATCH</b> /courses/update/:id </br>
 * <b>DELETE</b> /courses/delete/:id </br>
 * <b>POST</b> /courses/enroll/:id </br>
 * <b>POST</b> /courses/cancelenrollment/:id </br>
 * <b>GET</b> /courses/enrolled </br>
 * <b>GET</b> /courses/enrolledcourses </br>
 * <b>GET</b> /courses/enrolledusers/:id </br>
 * <b>POST</b> /courses/video/upload </br>
 * <b>GET</b> /courses/video/:id </br>
 * <b>GET</b> /courses/videos/:courseId </br>
 * <b>PATCH</b> /courses/video/update/:id </br>
 * <b>DELETE</b> /courses/video/delete/:videoId </br>
 * <b>GET</b> /courses/studentreport/:id </br>
 */


const {
    Video,
    Course,
    CourseReport,
    CourseSection,
} = require("../models/course.models");
const { BadRequestError, NotFoundError, ForbiddenError, InternalServerError } = require("../utils/errors");
const { User } = require("../models/user.models");

/* COURSES
*/

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
 ** @memberof CourseController
*/
exports.getCourses = async (req, res, next) => {
    if (Object.keys(req.body).length != 0) {
        const courses = await Course.find(req.body);
        return res.status(200).json(courses);
    }

    // Get all available courses
    const courses = (
        await Course.find().populate({
            path: 'course_sections',
            populate: 'videos exercises textmaterials'
        }).sort({ _id: -1 })
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

    const course = await Course.findById(req.params.id).populate({
        path: 'course_sections',
        populate: 'videos exercises textmaterials'
    });

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

    await CourseReport.create({
        course: course_id,
        user: req.user.id,
    })

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


/* VIDEOS
*/

/**
 * Upload video
 * 
 * @param {string} title
 * @param {string} description
 * @param {string} author
 * @param {string} duration | 00:00
 * @param {string} category 
 * @param {string} course_id  id of course to add video to
 * @param {string} course_section_id  id of course section to add video to
 * 
 * @returns {object} video
 * 
 * @throws {error} if an error occured

*/
exports.uploadVideo = async (req, res, next) => {
    const { title, author,
        video_url, description,
        duration, category, course_id,
        course_section_id } = req.body;

    let course_section = await CourseSection.findById(course_section_id).populate('course')
    if (!course_section) {
        return next(new NotFoundError('Course section not found'))
    }

    // Check if course section belongs to the course provided
    if (course_section.course._id.toString() !== course_id) {
        return next(new ForbiddenError('Course section does not belong to the course provided'))
    }

    // Check if course is available
    if (!course_section.course.isAvailable) {
        return next(new ForbiddenError('Course is not available'))
    }

    const video = await Video.create({
        title, author, video_url, description,
        duration, category, course: course_id, course_section: course_section._id
    });

    return res.status(200).json({
        success: true,
        data: {
            video: await video.populate({
                path: 'course_section',
                populate: {
                    path: 'course videos'
                }
            })
        }
    });
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
 * @description This function doesn't actually delete the video, it only updates its available status
 * if a videos `isAvailable` status is set to false, it wont be added when making query requests
 * 
 * @param {string} video_id - id of the video to delete
 * 
 * @returns {string} message 
 * 
 * @throws {error} if an error occured
 * @throws {BadRequestError} if video not found
 * 
 * @todo delete video from cloudinary
 * @todo delete video from database
 * @todo delete video from course
*/
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

/**
 * Get student course report
 * 
 * @description 
 * This function gets the course report for a particular student, the student must be enrolled in the course
 *  </br> 
 *  </br> 
 * 
 * The student course report contains the following data: </br>
 * 1. Course details (title, description, category, etc) </br>
 * 2. Completed exercises </br>
 * 3. Completed videos </br>
 * 4. Completed sections (sections that have all their videos completed) </br>
 * 
 * @param {string} course_id - id of the course to get student report for
 * 
 * @returns {object} course_report
 * 
 * @throws {InternalServerError} An error occured
 * @throws {BadRequestError} if course not found
 * @throws {BadRequestError} if user not enrolled in course
*/
exports.getStudentReportForCourse = async (req, res, next) => {
    const course_id = req.params.id;

    if (!course_id || course_id == ':id') {
        return next(new BadRequestError("Missing param `id` in request params"))
    }

    const course = await Course.findById(course_id)
    if (!course) {
        return next(new NotFoundError("Course not found"))
    }

    // Check if student is enrolled in course
    if (!course.enrolled_users.includes(req.user.id)) {
        return next(new BadRequestError("You are not enrolled in this course"))
    }

    const student_course_report = await CourseReport.findOne({
        user: req.user.id,
        course: course_id
    }).populate({
        path: 'course',
        select: 'title description exercises',
    }).populate('user completed_exercises')

    return res.status(200).send({
        success: true,
        data: {
            student_course_report
        }
    })
}





