const { CourseSection, TextMaterial } = require("../models/course.models");
const { uploadToCloudinary } = require("../utils/cloudinary");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const fs = require("fs");

/**
 * Add text material to course section
 * 
* @description Add text material to course section
* 
* @param {string} course_section_id - Id of course section to add text material to
* @param {string} title - Title of text material
* @param {string} description - Description of text material
* @param {string} course_id - Id of course
* 
* @throws {BadRequestError} if missing param in request body
* @throws {NotFoundError} if course section not found
*   
* @returns {Object}
* 
 */
exports.addTextMaterial = async (req, res, next) => {
    const { course_section_id, title, description, course_id } = req.body;
    const file_to_upload = req.file;

    // Check if required params are present
    if (!course_section_id || !title ||
        !description || !course_id ||
        !file_to_upload) {
        return next(new BadRequestError("Missing required param in request body"));
    }

    // Check if course section exists
    const course_section = await CourseSection.findById(course_section_id);
    if (!course_section) {
        return next(new NotFoundError("Course section not found"));
    }

    const text_material = new TextMaterial({
        title, description,
        course_section: course_section_id,
        course: course_id
    });

    // Upload file to cloudinary
    const file_url = await uploadToCloudinary({
        path: file_to_upload.path,
        file_name: `textmaterial_${text_material._id}_${file_to_upload.originalname}`,
        destination_path: `course_${course_id}/coursesection_${course_section_id}`,
    });

    // Save file url to database
    text_material.file_url = file_url;
    await text_material.save();

    // Delete file from server
    await fs.unlink(file_to_upload.path, (err) => {
        if (err) {
            console.log(err);
        }
    });


    return res.status(200).send({
        success: true,
        data: {
            text_material: await text_material.populate({
                path: "course_section",
                select: "title description _id",
                populate: {
                    path: "course",
                    select: "title description _id",
                },
            })
        },
    });
}

exports.getTextMaterialData = async (req, res, next) => {
}

exports.updateTextMaterial = async (req, res, next) => {
}

exports.deleteTextMaterial = async (req, res, next) => {
}

exports.getTextMaterials = async (req, res, next) => {
}
