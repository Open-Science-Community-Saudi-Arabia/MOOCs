const { Course, CourseSection } = require("../models/course.models")
const { BadRequestError, NotFoundError } = require("../utils/errors")

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
    const { course_id, title } = req.body
    if (!course_id | !title) {
        return next(new BadRequestError('Missing required param in request body'))
    }

    const course = await Course.findById(course_id)
    if (!course) {
        return next(new NotFoundError('Course not found'))
    }

    const course_section = await CourseSection.create({ title, course: course_id })

    return res.status(200).send({
        success: true,
        data: {
            course_section
        }
    })
}

exports.getCourseSectionData = async (req, res, next) => {

}

exports.updateCourseSection = async (req, res, next) => {

}

exports.hideCourseSection = async (req, res, next) => {

}

exports.showCourseSection = async (req, res, next) => {

}

exports.deleteCourseSection = async (req, res, next) => {

}

exports.addVideoToCourseSection = async (req, res, next) => {

}

exports.addExerciseToCourseSection = async (req, res, next) => {

}

