const { Course, CourseSection, Video } = require("../models/course.models");
const { BadRequestError, NotFoundError, ForbiddenError } = require("../utils/errors");

/**
 * Create course section
 *
 * @description Create course section to group course contents
 *
 * @param {string} course_id - Id of course to add section to
 * @param {string} title - Title of course section
 *
 * @throws {BadRequestError} if missing param in request body
 * @throws {NotFoundError} if course not found
 *
 * @returns {Object}
 */
exports.createCourseSection = async (req, res, next) => {
    const { course_id, title } = req.body;
    if (!course_id | !title) {
        return next(new BadRequestError("Missing required param in request body"));
    }

    const course = await Course.findById(course_id);
    if (!course) {
        return next(new NotFoundError("Course not found"));
    }

    const course_section = await CourseSection.create({
        title,
        course: course_id,
    });

    return res.status(200).send({
        success: true,
        data: {
            course_section,
        },
    });
};

/**
 * Get course section data
 *
 * @description Get all the contents of a course section
 *
 * @param {string} id - Id of course section
 *
 * @throws {BadRequestError} if missing param in request body
 * @throws {NotFoundError} if course section not found
 *
 * @returns {Object}
 */
exports.getCourseSectionData = async (req, res, next) => {
    const course_section_id = req.params.id;

    if (!course_section_id || course_section_id == ":id") {
        return next(new BadRequestError("Missing param `id` in request params"));
    }

    const course_section = await CourseSection.findById(
        course_section_id
    ).populate("course videos exercises");
    if (!course_section) {
        return next(new NotFoundError("Course section not found"));
    }

    return res.status(200).send({
        success: true,
        data: {
            course_section: course_section.toObject(),
        },
    });
};

/**
 * Update course section data
 *
 * @description Update contents of a course section
 *
 * @param {string} id - Id of course section
 * @param {object} req.body - content to update in coursesection
 * 
 * @throws {BadRequestError} if missing param in request body
 * @throws {NotFoundError} if course section not found
 *
 * @returns {Object}
 */
exports.updateCourseSection = async (req, res, next) => {
    const { title } = req.body
    const course_section_id = req.params.id

    if (!course_section_id || course_section_id == ":id") {
        return next(new BadRequestError("Missing param `id` in request params"));
    }

    const course_section = await CourseSection.findByIdAndUpdate(
        course_section_id, { title }, { new: true }
    ).populate("course videos exercises");
    if (!course_section) {
        return next(new NotFoundError("Course section not found"));
    }

    return res.status(200).send({
        success: true,
        data: {
            course_section: course_section.toObject(),
        },
    });

};

// exports.hideCourseSection = async (req, res, next) => { };

// exports.showCourseSection = async (req, res, next) => { };

/**
 * Delete course section 
 *
 * @description Delete course section
 *
 * @param {string} id - Id of course section
 * 
 * @throws {BadRequestError} if missing param in request body
 * @throws {NotFoundError} if course section not found
 * @throws {ForbiddenError} if course section still has linked exercises
 * @throws {ForbiddenError} if course section still has linked videos 
 *
 * @returns {Object}
 */
exports.deleteCourseSection = async (req, res, next) => {
    const course_section_id = req.params.id

    if (!course_section_id || course_section_id == ":id") {
        return next(new BadRequestError("Missing param `id` in request params"));
    }

    const course_section = await CourseSection.findById(
        course_section_id).populate('videos exercises')

    if (!course_section) {
        return next(new NotFoundError('Course content not found'))
    }

    // Check if course section has linked exercises or videos
    // if yes, user should first delete the videos or exercise
    // or link them to another course section
    if (!course_section.exercises) {
        return next(new ForbiddenError('Course content still has linked exercises'))
    }

    if (!course_section.videos) {
        return next(new ForbiddenError('Course content still has linked videos'))
    }

    await course_section.deleteOne()

    return res.status(200).send({
        success: true,
        data: {
            message: 'Course content deleted successfully'
        }
    })
}

/**
 * Add Video to course section 
 *
 * @description Delete course section
 *
 * @param {string} course_section_id - Id of course section 
 * @param {string} video_id - Id of video 
 * 
 * @throws {BadRequestError} if missing param in request body
 * @throws {NotFoundError} if course section not found
 * @throws {NotFoundError} if video not found
 *
 * @returns {Object}
 */
exports.addVideoToCourseSection = async (req, res, next) => {
    const { course_section_id, video_id } = req.body

    if (!course_section_id || !video_id) {
        return next(new BadRequestError("Missing param in request params"));
    }

    // Check if course section exists
    const course_section = await CourseSection.findById(
        course_section_id)
    if (!course_section) {
        return next(new NotFoundError('Course content not found'))
    }

    // Link video to course section if it exists
    const video = await Video.findByIdAndUpdate(
        video_id, { course_section: course_section_id }, { new: true })
    if (!video) {
        return next(new NotFoundError('Video not found'))
    }

    return res.status(200).send({
        success: true,
        data: {
            video: video.toObject()
        }
    })
};

exports.addExerciseToCourseSection = async (req, res, next) => { };
