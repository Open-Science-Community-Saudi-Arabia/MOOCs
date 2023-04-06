/**
 * @fileoverview Text material controller
 * 
 * @category Backend API
 * @subcategory Controllers
 * 
 * @module TextMaterial Controller
 * 
 * @requires ../models/course.models
 * @requires ../utils/cloudinary
 * @requires ../utils/errors
 * @requires fs
 * 
 * @description This module is responsible for handling all text material related requests <br>
 * 
 * The following routes are handled by this module:: <br>
 * 
 * </br>
 * 
 * <b>POST</b> /textmaterial/new <i> - Add a new text material to a particular course section </i> <br>
 * <b>GET</b> /textmaterial/:id <i> - Get a particular text material </i> <br>
 * <b>PATCH</b> /textmaterial/update/:id <i> - Update a particular text material </i> <br>
 * <b>DELETE</b> /textmaterial/delete/:id <i> - Delete a particular text material </i> <br>
 */

const { CourseSection, TextMaterial } = require("../models/course.models");
const { uploadToCloudinary } = require("../utils/cloudinary");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const fs = require("fs");

/**
    * Add text material to course section
    * 
    * @description Add text material to course section, 
    * the text material can be a pdf, docx, pptx, etc.
    * 
    * <br>
    * 
    * The text material is first uploaded to cloudinary saving
    * the cloudinary url to the database
    * 
    * @see {@link module:CourseModel~textmaterialSchema }
    * @see {@link https://cloudinary.com/documentation/upload_images} 
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
* */
exports.uploadTextMaterial = async (req, res, next) => {
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
        file_name: `${text_material._id}_${file_to_upload.originalname}`,
        destination_path: `courses/${course_id}/coursesections/${course_section_id}/textmaterials`,
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

/**
 * Get text material data
 * 
 * @description Get text material data, including course section and course data
 * 
 * @see {@link module:CourseModel~textmaterialSchema}
 * 
 * @param {string} id - Id of text material
 * 
 * @throws {BadRequestError} if missing param in request params
 * @throws {NotFoundError} if text material not found
 * 
 * @returns {Object}
 */
exports.getTextMaterialData = async (req, res, next) => {
    const text_material_id = req.params.id;

    if (!text_material_id || text_material_id == ":id") {
        return next(new BadRequestError("Missing param `id` in request params"));
    }

    const text_material = await TextMaterial.findById(text_material_id).populate(
        [{
            path: "course_section",
            select: "title description _id",
            populate: {
                path: "course",
                select: "title description _id",
            },
        },
        { path: "downloadable_resources" }]);

    if (!text_material) {
        return next(new NotFoundError("Text material not found"));
    }

    return res.status(200).send({
        success: true,
        data: {
            text_material,
        },
    });
}

/**
 * Update text material
 * 
 * @description Update text material
 * 
 * @param {string} id - Id of text material
 * @param {string} title - Title of text material
 * @param {string} description - Description of text material
 * 
 * @throws {BadRequestError} if missing param in request params
 * @throws {NotFoundError} if text material not found
 * 
 * @returns {Object}
 */
exports.updateTextMaterial = async (req, res, next) => {
    const { title, description } = req.body;
    const text_material_id = req.params.id;

    // Check if required params are present
    if (!text_material_id || text_material_id == ":id") {
        return next(new BadRequestError("Missing param `id` in request params"));
    }

    const text_material = await TextMaterial.findByIdAndUpdate(
        text_material_id,
        { title, description },
        { new: true }
    ).populate({
        path: "course_section",
        select: "title description _id",
        populate: {
            path: "course",
            select: "title description _id",
        },
    });

    // Check if text material exists
    if (!text_material) {
        return next(new NotFoundError("Text material not found"));
    }

    return res.status(200).send({
        success: true,
        data: {
            text_material,
        },
    });
}

/**
 * Delete text material
 * 
 * @description Delete text material
 * 
 * @param {string} id - Id of text material
 * 
 * @throws {BadRequestError} if missing param in request params
 * @throws {NotFoundError} if text material not found
 * 
 * @returns {Object}
 */
exports.deleteTextMaterial = async (req, res, next) => {
    const text_material_id = req.params.id;

    // Check if required params are present
    if (!text_material_id || text_material_id == ":id") {
        return next(new BadRequestError("Missing param `id` in request params"));
    }

    const text_material = await TextMaterial.findByIdAndDelete(
        text_material_id
    ).populate({
        path: "course_section",
        select: "title description _id",
        populate: {
            path: "course",
            select: "title description _id",
        },
    });

    // Check if text material exists
    if (!text_material) {
        return next(new NotFoundError("Text material not found"));
    }

    return res.status(200).send({
        success: true,
        data: {
            text_material,
        },
    });
}