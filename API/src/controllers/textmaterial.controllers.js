const { CourseSection, TextMaterial } = require("../models/course.models");
const { uploadToCloudinary } = require("../utils/cloudinary");
const { NotFoundError, BadRequestError } = require("../utils/errors");

exports.addTextMaterial = async (req, res, next) => {
    const { course_section_id, title, course_id } = req.body;
    const file_to_upload = req.file;

    // Check if required params are present
    if (!course_section_id || !title || !course_id || !file_to_upload) {
        return next(new BadRequestError("Missing required param in request body"));
    }

    // Check if course section exists
    const course_section = await CourseSection.findById(course_section_id);
    if (!course_section) {
        return next(new NotFoundError("Course section not found"));
    }

    const text_material = new TextMaterial({
        title,
        course_section: course_section_id,
    });

    // Save file to server
    const file_path = path.join(
        __dirname,
        `../public/textmaterials/${file_to_upload.originalname}`
    );

    // Upload file to cloudinary
    const file_url = await uploadToCloudinary({
        path: file_path,
        filename: `textmaterial_${text_material._id}/`,
        destination_path: `course_${course_id}/coursesection_${course_section_id}`,
    });

    text_material.file_url = file_url;

    await text_material.save();

    // Delete file from server

    return res.status(200).send({
        success: true,
        data: {
            text_material,
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
