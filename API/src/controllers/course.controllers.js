/**
 * @category Backend API
 * @subcategory Controllers
 * @module Course Controller
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
    Exercise,
    ExerciseReport,
} = require("../models/course.models");
const { BadRequestError, NotFoundError, ForbiddenError, InternalServerError } = require("../utils/errors");
const { User } = require("../models/user.models");
const { populate } = require("../models/password.models");
const { uploadToCloudinary } = require("../utils/cloudinary");
const fs = require("fs");
const mongoose = require("mongoose");
const { translateResponse } = require("../utils/crowdin");

/* COURSES
*/

/**
 * Create new course
 * 
 * @description This function creates a new course
 * 
 * @param {string} title - Course title
 * @param {string} author - Course author
 * @param {string} description - Course description
 * 
 * @returns {MongooseObject} savedCourse
 * 
 * @throws {error} if an error occured
 * */
exports.createCourse = async (req, res, next) => {
    const preview_image = req.file

    if (!preview_image) {
        return next(new BadRequestError('Missing preview image'))
    }

    const newCourse = new Course(req.body);

    // Upload preview image to cloudinary
    const file_url = await uploadToCloudinary({
        path: preview_image.path,
        file_name: `course_preview_${newCourse._id}`,
        destination_path: 'courses/preview_images'
    })

    // Save file url to database
    newCourse.preview_image = file_url;
    const savedCourse = await newCourse.save();

    // Delete file from server
    await fs.unlink(preview_image.path, (err) => {
        if (err) {
            console.log(err);
        }
    })

    return res.status(200).send({
        success: true,
        data: {
            course: savedCourse
        }
    })
};

/**
 * Get courses
 * 
 * @description This function gets all the courses available,
 * or gets all the courses that match the query. 
 * 
 * The query is passed in the request body, and it is an object
 * with the following structure: </br>
 * 
 * { <br>
 * &nbsp;&nbsp;&nbsp;&nbsp; key: value <br>
 * } <br>
 * 
 * The key is the field to be queried, and the value is the value to be matched. <br>
 * 
 * For example, if you want to get all the courses that have the title "Introduction to Python",
 * you would pass the following object in the request body: <br>
 * 
 * { <br>
 * &nbsp;&nbsp;&nbsp;&nbsp; title: "Introduction to Python" <br>
 * } <br>
 * 
 * If you want to get all the courses that have the title "Introduction to Python" and the author "John Doe",
 * you would pass the following object in the request body: <br>
 *  
 * { <br>
 * &nbsp;&nbsp;&nbsp;&nbsp; title: "Introduction to Python", <br>
 * &nbsp;&nbsp;&nbsp;&nbsp; author: "John Doe" <br>
 * } <br>
 * 
 * If you want to get all the courses, then the request body should be empty. <br>
 * 
 * 
 * @returns {object} courses
 * */
exports.getCourses = async (req, res, next) => {
    if (Object.keys(req.body).length != 0) {
        const courses = await Course.find(req.body);
        return res.status(200).send({
            success: true,
            data: {
                courses
            }
        });
    }

    // Get all available courses
    const courses = (
        await Course.find().populate({
            path: 'course_sections',
            populate: [
                {
                    path: 'videos',
                    model: 'Video',
                    populate: 'downloadable_resources'
                },
                {
                    path: 'textmaterials',
                    model: 'TextMaterial',
                    populate: 'downloadable_resources'
                },
                {
                    path: 'exercises',
                    populate: 'questions'
                }

            ]
        }).sort({ _id: -1 })
    ).filter((course) => {
        if (course.isAvailable) return course.toObject();
    });

    console.log(courses)

    return res.status(200).send({
        success: true,
        data: {
            courses
        }
    });
};

/**
 * Get course data
 * 
 * @description Gets all the content of a course, including videos,
 * author, description <br>
 *
 * <br> 
 * 
 * Each course has a list of course sections, which are the different
 * sections of the course. Each course section has a list of videos, exercises
 * and text materials. 
 * In each course section, the videos, exercises and text materials are stored
 * in a list, the list is stored with a key `content`. The content is an array of objects,
 * where each object type is either `video`, `exercise` or `textmaterial`. <br>
 * 
 * @param {string} id - id of the course 
 * 
 * @returns course
 * */
exports.getCourseData = async (req, res, next) => {
    if (!req.params.id || req.params.id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    let course = await Course.findById(req.params.id).populate({
        path: 'course_sections',
        populate: [
            {
                path: 'videos',
                model: 'Video',
                populate: 'downloadable_resources'
            },
            {
                path: 'textmaterials',
                model: 'TextMaterial',
                populate: 'downloadable_resources'
            },
            {
                path: 'exercises',
                populate: 'questions'
            }
        ]
    });

    // if (course && course.course_sections) {

    //     for (let i = 0; i < course.course_sections.length; i++) {
    //         const curr_section = course.course_sections[i];

    //         if (curr_section.exercises) {
    //             for (let j = 0; j < curr_section.exercises.length; j++) {
    //                 const exercise = curr_section.exercises[j].toObject();
    //                 const exercise_report = await ExerciseReport.findOne({ exercise: exercise._id, user: req.user.id });
    //                 if (exercise_report) {
    //                     exercise.best_score = exercise_report.best_score;
    //                     exercise.best_percentage_passed = exercise_report.percentage_passed;
    //                 }
    //                 curr_section.exercises[j] = exercise;
    //             }
    //         }


    //         course.course_sections[i] = curr_section;
    //     }
    // }

    // if (req.user && course.enrolled_users.includes(req.user?.id)) {
    //     const course_report = await CourseReport.findOne({ course: course._id, user: req.user.id });
    //     if (course_report) {
    //         course.best_score = course_report.best_score;
    //         course = course.toObject()
    //         course.overall = course_report.percentage_passed;
    //     }
    // }

    console.log('getting the course content')
    req.query.lang  = 'ar'

    // const response = req.query.lang == 'ar' ? await translateResponse(course) : course
    await translateResponse(course)

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
 * @description Updates the course data, including title, author, description <br>
 * 
 * <br>
 * 
 * <b>NOTE:</b> This function does not update the course sections, videos, exercises and text materials. <br>
 * To update the course sections, videos, exercises and text materials, use the following functions: <br>
 * 
 * <b>POST</b> /coursesection/new </br>
 * <b>PATCH</b> /coursesection/update/:id </br>
 * <b>DELETE</b> /coursesection/delete/:id </br>
 * <b>POST</b> /course/video/upload </br>
 * <b>PATCH</b> /course/video/update/:id </br>
 * <b>DELETE</b> /course/video/delete/:id </br>
 * <b>POST</b> /exercise/new </br>
 * <b>PATCH</b> /exercise/update/:id </br>
 * <b>DELETE</b> /exercise/delete/:id </br>
 * <b>POST</b> /textmaterial/new </br>
 * <b>PATCH</b> /textmaterial/update/:id </br>
 * 
 * <br>
 * 
 * <b> NOTE: <b> These routes are subject to change, check the documentation for the latest routes. <br>
 * 
 *  
 * @param {string} id
 * 
 * @returns {string} message
 * @returns {object} course
 * 
 * @throws {BadRequestError} if Course not found
 * */
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
 * @description Deletes a course. <br>
 * 
 * <br>
 * 
 * <b>NOTE:</b> This function does not delete the course data from the database,
 * it only makes it unavailable for users. It does this by setting the isAvailable field to false
 * When making requests to the getCourses route, it'll only filter only the courses with
 * where their value for `isAvailable` is true <br>
 * 
 * @param {string} id - Id of the course
 * 
 * @returns {string} message
 * */
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
 * Enroll for a course.
 *
 * @description When a user enrolls for a course, a course report is created for the user. 
 * The course report contains the progress of the user in the course. 
 *
 * @param {string} id - The ID of the course to enroll for.
 * 
 * @throws {BadRequestError} Missing `id` parameter in request.
 * @throws {NotFoundError} Course with given `id` not found.
 * @throws {InternalServerError} An error occurred while processing the request.
 *
 * @returns {Object} Response object.
 * @returns {boolean} Response object.success - Indicates whether the operation was successful.
 * @returns {string} Response object.data.message - A message indicating the status of the operation.
 * */
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
 * Cancel course enrollment for the currently authenticated user.
 *
 * @description This function cancels a user's enrollment for a course by removing 
 * the user's ID from the `enrolled_users` array of the course.
 *
 * @param {string} id - The ID of the course to cancel enrollment for.
 * @throws {BadRequestError} Missing `id` parameter in request.
 * @throws {NotFoundError} Course with given `id` not found.
 * @throws {InternalServerError} An error occurred while processing the request.
 *
 * @returns {Object} Response object.
 * @returns {boolean} Response object.success - Indicates whether the operation was successful.
 * @returns {string} Response object.data.message - A message indicating the status of the operation.
 * */
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
 * @description This function returns all the courses that a user is enrolled in. 
 * No request parameters are required since the user id is gotten from the request object 
 * after the user is authenticated.
 * 
 * @returns {object} enrolledCourses 
 * */
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
 * Get enrolled users
 *
 * @description Retrieves a list of all users who have enrolled in the specified course.
 *
 * @param {string} id - The ID of the course to retrieve enrolled users for.
 * @returns {object} - An object containing a list of enrolled users for the course.
 *
 * @throws {BadRequestError} If the course ID is missing from the request parameters.
 * @throws {NotFoundError} If the specified course does not exist.
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


/**
 * Upload video
 * 
 * @description This function uploads a video to the database and links the video 
 * to a particular course section in a course. <br>
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
 * */
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
 * Remove video from course
 * 
 * @description This function removes a video from a course,
 * it doesn't remove the course from the video, it only removes the video from the course
 * 
 * @param {string} video_id - id of the video 
 * @param {string} course_id - id of the course 
 * 
 * @returns {Object} course 
 * */
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
*   Get video data
*
*   @description This function returns the data for a specific video, 
*   including its title, description, duration, and URL.
*
*   @param {string} id - The ID of the video to retrieve
*
*   @returns {Object} - An object containing the video data, including its title,
*   description, duration, and URL. If the video is not available, the video property will be null.
*
*   @throws {BadRequestError} If the ID is missing from the request parameters
*
*   @throws {NotFoundError} If the video with the given ID is not found
*
*   @see {@link module:VideoModel~videoSchema Video}
*/
exports.getVideoData = async (req, res, next) => {
    if (!req.params.id || req.params.id == ':id') {
        return next(new BadRequestError('Missing param `id` in request params'))
    }

    const videoId = req.params.id;
    const video = await Video.findById(videoId).populate('course downloadable_resources')

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
 * @description This function updates the video data </br>
 * 
 * </br>
 * 
 * The following fields can be updated: </br>
 * 1. title </br>
 * 2. description </br>
 * 3. author </br>
 * 4. duration </br>
 * 5. category </br>
 * 6. course_id </br>
 * 7. course_section_id </br>
 * 8. video_url </br>
 * 
 * </br>
 * 
 * The following fields cannot be updated: </br>
 * 1. isAvailable </br>
 * This field is set to false when a video is deleted </br>
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
