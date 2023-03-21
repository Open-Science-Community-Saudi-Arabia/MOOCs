/**
 * @fileoverview Course section controller
 * 
 * @category Backend API
 * @subcategory Controllers
 * 
 * @module CourseSection Controller
 * @requires ../models/course.models
 * @requires ../utils/errors
 * 
 * @description This module is responsible for handling all course section related requests <br>
 * 
 * The following routes are handled by this module:: <br>
 * 
 * </br>
 * 
 * <b>POST</b> /coursesection/new <br>
 * <b>GET</b> /coursesection/:id <br>
 * <b>PATCH</b> /coursesection/update/:id <br>
 * <b>DELETE</b> /coursesection/delete/:id <br>
 */

const { Course, CourseSection, Video, Exercise } = require("../models/course.models");
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
    ).populate("videos exercises textmaterials");
    if (!course_section) {
        return next(new NotFoundError("Course section not found"));
    }

    return res.status(200).send({
        success: true,
        data: {
            course_section: await course_section.populate({
                path: "course", select: "title description author _id",
            }),
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
